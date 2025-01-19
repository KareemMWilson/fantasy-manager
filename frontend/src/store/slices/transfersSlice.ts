import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
  name: string;
}

interface Team {
  teamName: string;
  userEmail: string;
  players: Player[] | [];
}

export interface TeamState {
  team: Team;
}

const initialState: TeamState = {
  team: {
    teamName: "",
    userEmail: "",
    players: [],
  },
};

const transfersSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    setUserTransfers: (state, action: PayloadAction<{ team: Team }>) => {
      state.team = action.payload.team;
    },
  },
});

export const { setUserTransfers } = transfersSlice.actions;
export default transfersSlice.reducer;
