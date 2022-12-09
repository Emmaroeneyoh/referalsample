import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000'
const initialState = {
    activeusers : [],
    users : [],
    user : {},
    friend : {},
    success :false,
    loading:'',
    error: '',
    FriendStatus:""

}

//fucntion for signup
export const userSignup = createAsyncThunk(
    'usersignup',
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/client`, { 
                email:values.email,
                username:values.username,
               
            })
            console.log(token)
            return token.data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data.message)
        }
    }
)

// function for sign in
export const userSignin = createAsyncThunk(
    'usersignin',
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/client/login`, { 
                email:values.email,
            })
            console.log(token)
            return token.data
        } catch (error) {
            console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message)
        }
    }
)

//to get single user
export const Singleuser = createAsyncThunk(
    'singleuser',
    async (values, { rejectWithValue }) => {
        console.log("this is values", values)
        try {
            const token = await axios.get(`${url}/client/single/${values}`)
            console.log(token)
            return token.data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

//get all users
export const Getusers = createAsyncThunk(
    'getusers',
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.get(`${url}/client`)
            console.log(token)
            return token.data
        } catch (error) {
            console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message)
        }
    }
)

//get all active users 
export const Getactiveusers = createAsyncThunk(
    'getactiveusers',
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.get(`${url}/client/online`)
            console.log(token)
            return token.data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


const adminslice = createSlice({
    name: "product",
    initialState,
    reducers:{
        userReset:(state) => {
         state.error =""
         state.loading = ''
         state.success = false
        },
        online:(state) => {
         state.FriendStatus ="Online"
        
        },
        offline:(state , action) => {
         state.FriendStatus = action.payload
        
        }

    },
    extraReducers: (builder) => {
        builder
            //for signup
            .addCase(userSignup.pending, (state) => {
                state.loading = 'pending'
            
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.loading = 'success'
                state.user = action.payload
                state.success = true
                state.error = ''
            
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload
                state.success = false
            
            })
            //for signin
            .addCase(userSignin.pending, (state) => {
                state.loading = 'pending'
            
            })
            .addCase(userSignin.fulfilled, (state, action) => {
                state.loading = 'success'
                state.user = action.payload
                state.success = true
                state.error = ''
            
            })
            .addCase(userSignin.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload
                state.success = false
            
            })
            //for getting all users
            .addCase(Getusers.pending, (state) => {
                state.loading = 'pending'
            
            })
            .addCase(Getusers.fulfilled, (state, action) => {
                state.loading = 'success'
                state.users = action.payload
                state.success = true
                state.error = ''
            
            })
            .addCase(Getusers.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload
                state.success = false
            
            })
            //for getting all active users
            .addCase(Getactiveusers.pending, (state) => {
                state.loading = 'pending'
            
            })
            .addCase(Getactiveusers.fulfilled, (state, action) => {
                state.loading = 'success'
                state.activeusers = action.payload
                state.success = true
                state.error = ''
            
            })
            .addCase(Getactiveusers.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload
                state.success = false
            
            })
        
            //for getting all active users
            .addCase(Singleuser.pending, (state) => {
                state.loading = 'pending'
            
            })
            .addCase(Singleuser.fulfilled, (state, action) => {
                state.loading = 'success'
                state.friend = action.payload
                state.success = true
                state.error = ''
            
            })
            .addCase(Singleuser.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.payload
                state.success = false
            
            })
        
    }
})

export default adminslice.reducer
export const {userReset , offline, online} = adminslice.actions