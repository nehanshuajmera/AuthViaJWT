// login
export const loginUser = async (req, res) => {

};

// Register
export const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.signUp(username, email, password);
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json(`Error: ${err.message}`);
    }
}