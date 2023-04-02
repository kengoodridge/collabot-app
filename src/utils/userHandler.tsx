
// Global in memory lookup
const sessionLookup = {};

export type User = {
    name: string,
    color: string
  }

  
export const getUser = (session: string) => {
    let user;
    if (session && sessionLookup[session]) {
       user = sessionLookup[session];
    }  
    return {
        user
    };
}

export const setUser = (session: string, user: User) => {
    if (session && !sessionLookup[session]) {
        sessionLookup[session] = user;
    }
}
