import { ref } from 'vue'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async () => {
        try {
            // Create a query to fetch posts ordered by 'createdAt' in descending order
            const q = query(collection(projectFirestore, 'posts'), orderBy('createdAt', 'desc'))
            
            // Execute the query
            const res = await getDocs(q)

            // Map the documents to an array of post objects
            posts.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return { posts, error, load }
}

export default getPosts