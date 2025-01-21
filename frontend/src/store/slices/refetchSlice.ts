import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RefetchState {
  team?: boolean;
  transfers?: boolean;
  refetchAllData?: boolean;
}

const initialState: RefetchState = {
  team: false,
  transfers: false,
  refetchAllData: false,
};

const refetchSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    refetchTeam: (state, action: PayloadAction<boolean>) => {
      state.team = action.payload;
    },
    refetchTransfers: (state, action: PayloadAction<boolean>) => {
      state.transfers = action.payload;
    },
    refetchAll: (state, action: PayloadAction<boolean>) => {
      state.refetchAllData = action.payload;
    },
    doneRefetching: (state) => {
        state = initialState
      },
  },
});

export const { refetchTeam, refetchTransfers, refetchAll, doneRefetching } = refetchSlice.actions;
export default refetchSlice.reducer;
