import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import { apiRequest } from '../../utils/apiRequest';
import { ContactsInterface, IContactsInitialState } from '../interfaces/interfaces';
import { RootState } from '../../app/store';


export const fetchContacts = createAsyncThunk('contacts/fetchContacts', () => {
  return apiRequest('contacts','GET');
})

export const fetchContact = createAsyncThunk('contacts/fetchContact', (id:string | undefined) => {
    return apiRequest(`contacts/${id}`,'GET');
  })
  
  export const createContact = createAsyncThunk('contacts/createContact', (newContact: ContactsInterface) => {
    return apiRequest(`contacts`,'POST',newContact);
  })
  export const updateContact = createAsyncThunk('contacts/updateContact', (updatedContact: ContactsInterface) => {
    return apiRequest(`contacts/${updatedContact._id}`,'PUT',updatedContact);
  })
  
  export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id:string) => {
    const result = await apiRequest(`contacts/${id}`,'DELETE');
    if(result === 'The contact was correctly deleted.') {return id;}
  })

const initialState: IContactsInitialState = {
    data: [],
    item: null,
    status: 'idle'
  }

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchContact.pending, (state) => {
        state.status = 'pending';
        state.item = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.item = action.payload;
      })
      .addCase(fetchContact.rejected, (state) => {
        state.status = 'rejected';
        state.item = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = [...state.data, action.payload]
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.item = {...state.item, ...action.payload.updatedBooking}
        state.data = state.data.filter((item)=> item._id !== action.payload.updatedBooking.id);
        state.item && state.data.push(state.item)
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = state.data.filter((item)=> item._id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          createContact.pending,
          updateContact.pending,
          deleteContact.pending,
        ),
        (state) => {
          state.status = 'pending';
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          createContact.rejected,
          updateContact.rejected,
          deleteContact.rejected,
        ),
        (state) => {
          state.status = 'rejected';
        }
      )
  },
});

export default contactsSlice.reducer;
export const getContacts = (state:RootState) => state.contacts.data;
export const getContactsStatus = (state:RootState) => state.contacts.status;
export const getContact = (state:RootState) => state.contacts.item;