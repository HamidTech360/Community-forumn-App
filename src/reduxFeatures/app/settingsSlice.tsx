import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type SettingsState = {
  activeTab: string;
};

const initialState: SettingsState = {
  activeTab: "general"
};

export const SettingsSlice = createSlice({
  name: "settingsState",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    }
  }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setActiveTab } = SettingsSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectActiveTab = (state: RootState) => state.settings.activeTab;

// exporting the reducer here, as we need to add this to the store
export default SettingsSlice.reducer;
