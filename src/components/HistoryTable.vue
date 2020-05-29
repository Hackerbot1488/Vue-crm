<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(record,index) in records"
          :key="record.id"
        >
          <td>{{index + 1}}</td>
          <td>{{record.amount | currency('RUB')}}</td>
          <td>{{record.date | date('date')}}</td>
          <td>{{record.categoryName}}</td>
          <td>
            <span
              class="white-text badge"
              :class="[record.typeClass]"
            >
              {{record.typeText}}
            </span>
          </td>
          <td>
            <button
              class="btn-small btn"
              @click="$router.push('/detail/' + record.id)"
              v-tooltip="'Посмотреть запись'"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
