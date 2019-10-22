module.exports = {
    Success: () => {
        return {
            "status" : 200,
            "message" : "success"
        };
    },
    Created: (param) => {
        return {
            "status" : 201,
            "message" : `${param} success created`
        }
    },
    CollectionData: (data) => {
        return {
            "status" : 200,
            "message" : "success",
            "data" : data != null ? data : []
        }
    },
    Registered: (token) =>{
        return {
            "status" : 201,
            "message" : "success",
            "token" : token
        }
    },
    Unauthorized: () =>{
        return {
            "status" : 401,
            "message" : "unauthorized"
        }
    },
    Login: (token) => {
        return {
            "status" : 200,
            "message": "success",
            "token": token
        }
    }
};