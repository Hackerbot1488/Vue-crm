<template>
  <div>
    <div class="page-title">
      <h3>{{'localizeProfile' | localize()}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid : $v.name.$dirty && !$v.name.$required}"
        />
        <label for="description">{{'nameProfile' | localize()}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.$required"
        >
        {{'inputNameProfile' | localize()}}
        </span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <br/>
      <button class="btn waves-effect waves-light" type="submit">
        {{'updateData' | localize()}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  metaInfo () {
    return {
      title: this.$title('localizeProfile')
    }
  },
  data () {
    return {
      name: '',
      isRuLocale: true
    }
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields()
    }, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return 0
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        if (this.isRuLocale) {
          this.$message('Профиль обновлен')
        } else {
          this.$message('Profile is updated')
        }
      } catch (e) { }
    }
  }
}
</script>
