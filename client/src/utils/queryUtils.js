import { getUserById } from "../services/users";

export const fetchUserData = async (userId) => {
    try {
        const user = await getUserById(userId);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export const getRandomImageUrl = (width = 300, height = 200) => {
    // using picsum.photos for random images (index between 0 and 200 to get different images)
    return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 200)}`;
}
