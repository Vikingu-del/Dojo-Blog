import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const getPost = (id) => {
    const post = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            // Get a reference to the document
            const docRef = doc(projectFirestore, 'posts', id)
            
            // Fetch the document
            const res = await getDoc(docRef)

            // Check if the document exists
            if (!res.exists()) {
                throw Error('That post does not exist')
            }

            // Set the post value
            post.value = { ...res.data(), id: res.id }
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return { post, error, load }
}

export default getPost