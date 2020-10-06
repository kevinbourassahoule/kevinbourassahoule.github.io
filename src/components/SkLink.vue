<template>
  <a :href="href" :target="target" @click="$emit('click', $event)">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "SkLink",
  props: {
    href: {
      type: String,
      default: "#"
    },
    target: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss"></style>
