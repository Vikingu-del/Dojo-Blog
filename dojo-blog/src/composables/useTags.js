// take in an array of posts
// create a new tag set (so no duplicates)
// add the tags of each post to the tag set
// return a a single array of tags base on the set

import { ref } from 'vue'

const useTags = (posts) => {
    const tags = ref([]) // Create a reactive reference to an empty array
    const tagSet = new Set() // Create a Set to store unique tags

    posts.forEach(post => {
        post.tags.forEach(tag => tagSet.add(tag)) // Add each tag to the Set
    })

    tags.value = [...tagSet] // Convert the Set to an array and assign it to tags.value

    return { tags } // Return an object containing the tags reference
}

export default useTags