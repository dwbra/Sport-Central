import jwt from 'jsonwebtoken'

// sets the token as the request objects headers.authorization, and uses the split function to format the string
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        // Checks whether the authentication method is through normal email, as the token length is normally under 500 leng,th otherwise it is a google token
        const isCustomAuth = token.length < 500

        let decodedData

        // if statements to structure the useId to be the .id of normal email auth, and .sub for google auth
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token);
      
            req.userId = decodedData?.sub;
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth