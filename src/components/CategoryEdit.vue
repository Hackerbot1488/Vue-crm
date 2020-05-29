<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{cat.title}}
              </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{invalid : $v.title.$dirty && !$v.title.$required}"
           />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.$required"
          >
          Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid : $v.limit.$dirty && !$v.limit.$minValue}"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.$minValue"
          >
          Минимальная величина {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  props: ['categories'],
  data () {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  created () {
    const { title, limit, id } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current (currentId) {
      const cur = this.categories.find(cat => cat.id === currentId)
      this.title = cur.title
      this.limit = cur.limit
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return 0
      }
      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }
      try {
        await this.$store.dispatch('updateCategory', categoryData)
        this.$emit('updated', categoryData)
        this.$message('Категория успешно обновлена')
      } catch (e) {}
    }
  }
}
</script>
