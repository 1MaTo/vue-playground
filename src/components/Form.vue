<template>
  <form @submit.prevent="submit">
    <div class="form-group" :class="{ 'form-group--error': $v.form.name.$error }">
      <label class="form__label">Имя</label>
      <input class="form__input" v-model.trim="$v.form.name.$model" />
      <div class="error" v-if="!$v.form.name.required">{{requiredTitle}}</div>
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.form.surname.$error }">
      <label class="form__label">Фамилия</label>
      <input class="form__input" v-model.trim="$v.form.surname.$model" />
      <div class="error" v-if="!$v.form.surname.required">{{requiredTitle}}</div>
    </div>
    <div class="form-group">
      <label class="form__label">Отчество</label>
      <input class="form__input" v-model.trim="$v.form.patronymic.$model" />
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.form.birthdate.$error }">
      <label class="form__label">День рождения</label>
      <input class="form__input" v-model.trim="$v.form.birthdate.$model" />
      <div class="error" v-if="!$v.form.birthdate.required">{{requiredTitle}}</div>
      <div class="error" v-if="!$v.form.birthdate.isDate">{{dateTitle}}</div>
    </div>
    <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
  </form>
</template>

<script>
import { required, helpers } from "vuelidate/lib/validators";
import moment from "moment";
moment().format();

const isDate = (value) => {
console.log(helpers.req(value))
  if (helpers.req(value)) {
    return moment(value, "DD-MM-YYYY").isValid() && value.length === 10 && moment(value, "DD-MM-YYYY").isBefore(moment());
  } else {
    return true;
  }
};

export default {
  data: () => {
    return {
      form: {
        name: "",
        surname: "",
        birthdate: "",
        patronymic: "",
      },
      submitStatus: null,
      requiredTitle: "Обязательное поле",
      dateTitle: "Укажите корректную дату (дд/мм/гггг)",
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      surname: {
        required,
      },
      birthdate: {
        required,
        isDate,
      },
      patronymic: {},
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "OK";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  padding: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 250px;
  color: $main-text;
  margin-bottom: 30px;
  position: relative;
}

.form__input {
  background: $bg_light;
  color: $dark-text;
  border-radius: 5px;
  outline: none;
  border: 1px solid #fff0;
  height: 35px;
  padding: 0px 10px;
  font-size: inherit;
  margin: 10px 0px;
}

.form__input:hover {
  border: 1px solid $dark-text;
}

.form__input:focus {
  color: $main-text;
  border: 1px solid $main-text;
}

.error {
  display: none;
  font-size: 12px;
  position: absolute;
  bottom: -15px;
  color: $error;
}

.form-group--error > .error {
  display: inherit;
}
</style>