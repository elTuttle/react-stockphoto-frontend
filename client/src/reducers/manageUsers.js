export default function manageUsers(state={
  user: {
    name: "",
    token: ""
  }
},action){
  switch (action.type) {
    case "NEW_USER":
      const name = action.user.name
      const token = action.user.token
      const newState = {
        user: {
          name: name,
          token: token
        }
      }
      return newState
    default:
      return state;
  }
}
