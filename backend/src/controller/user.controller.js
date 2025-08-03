import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshToken = async userId => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    // console.log(accessToken);
    // console.log("1====");

    const refreshToken = user.generateRefreshToken()
    // console.log(refreshToken);
    // console.log("2===");

    user.refreshToken = refreshToken
    // console.log("done");

    await user.save({ validateBeforeSave: false })
    // console.log("Done Done");

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating token')
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, bio } = req.body

  if (
    [fullName, email, username, password].some(field => field?.trim() === '')
  ) {
    throw new ApiError(400, 'all fields are required')
  }

  const existeduser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (existeduser) {
    throw new ApiError(409, 'User with email or username already exists')
  }

  const user = await User.create({
    fullName,
    email,
    password,
    bio,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  if (!createdUser) {
    throw new ApiError(500, 'something went wrong while registering the user')
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'User Registered Successfully'))
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  if (!username && !email) {
    throw new ApiError(400, 'username or email is required')
  }

  const user = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (!user) {
    throw new ApiError(404, 'User does not exist')
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid user credentials')
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  )

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  // options help to cookies are modified only on server
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        'User Logged In Successfully'
      )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    // updating refresh token
    {
      $set: {
        refreshToken: undefined
      }
    },

    // to get new value as undefined
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'unauthorized request')
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    const user = await User.findById(decodedToken?._id)
    if (!user) {
      throw new ApiError(401, 'Invalid refresh token')
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh Token is used ')
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    )

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newrefreshToken
          },
          'Access Token refreshed successfully'
        )
      )
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token')
  }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const user = await User.findById(req.user?._id)

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid old Password')
  }

  user.password = newPassword
  await user.save({ validateBeforeSave: false })

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password Changed Successfully '))
})

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'Current user fetched successfully'))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, bio, email } = req.body

  if (!fullName || !email || !bio) {
    throw new ApiError(400, 'All fields are required')
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
        bio: bio
      }
    },
    { new: true } //it will return the updated information
  ).select('-password')

  return res.status(200).json(new ApiResponse(200, user, 'Information updated'))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails
}
