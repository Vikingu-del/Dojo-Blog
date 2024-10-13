<template>
  <h1>Real-time Listeners</h1>
  <div v-for="post in posts" :key="post.id">
    <div>{{ post.title }}</div>
  </div>
</template>

<script>
import { projectFirestore } from '../firebase/config'
import { ref, onMounted } from 'vue'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export default {
  setup() {
    const posts = ref([])

    onMounted(() => {
      const q = query(collection(projectFirestore, 'posts'), orderBy('createdAt', 'desc'))
      const unsubscribe = onSnapshot(q, (snap) => {
        console.log('snapshot: ', snap)
        let docs = snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        console.log('documents: ', docs)
        posts.value = docs
      })

      // Cleanup the listener when the component is unmounted
      return () => unsubscribe()
    })

    return { posts }
  }
}
</script>

<style>
</style>