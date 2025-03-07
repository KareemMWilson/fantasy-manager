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

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setUserTeam: (state, action: PayloadAction<{ team: Team }>) => {
      state.team = action.payload.team;
    },
  },
});

export const { setUserTeam } = teamSlice.actions;
export default teamSlice.reducer;
