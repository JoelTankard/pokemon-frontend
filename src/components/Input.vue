<template>
    <div class="relative flex items-center gap-2 ">
        <system-sprites name="arrow-right" v-if="!disabled" />
        <input :disabled="disabled" v-if="type === 'text'" class="w-full p-2   border-b-2 border-black focus:outline-2 focus:outline-dashed focus:outline-black" :placeholder="placeholder" v-model="inputValue" @input="onInput"/>
        <textarea :disabled="disabled" v-else class="w-full p-2  border-2 border-black focus:outline-2 focus:outline-dashed focus:outline-black" :placeholder="placeholder" v-model="inputValue" @input="onInput"/>
    </div>
</template>

<script>
  import SystemSprites from '@/components/SystemSprites.vue';
  export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            default: 'text'
        },
      placeholder: {
        type: String,
        default: 'Enter text here'
      },
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            inputValue: this.value
        }
    },
    methods: {
        onInput() {
            console.log(this.inputValue);
            this.$emit('update:modelValue', this.inputValue);
        }
    },
    components: {
      SystemSprites
    }
  }
</script>