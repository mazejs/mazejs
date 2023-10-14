<script lang="ts">
import moment from 'moment'

export default {
  props: ["entry", "column"],

  methods: {
    nestedColumn(element: any, column: any) {
      if (!column.name.includes(".")) {
        return this.format(element, column)
      }

      if (!element[column.name.split(".")[0]]) {
        return null
      }

      return this.format(element = column.name.split(".").reduce((item: any, index: number) => item[index], element), column)
    },

    isObject(element: any, column: any) {
      return typeof element === "object" && element ? element[column.name] : element
    },

    format(element: any, column: any) {
      if (
        column.format
        && ["float", "money", "date", "datetime"].includes(column.format)
      ) {
        return this[`${column.format}Field`](element, column)  
      }

      return this.isObject(element, column)
    },

    dataFormat(data: any, format: string) {
      return data ? moment(data).format(format) : null
    },

    dateField(element: any, column: any) {
      return this.dataFormat(this.isObject(element, column), "YYYY-MM-DD")
    },

    datetimeField(element: any, column: any) {
      return this.dataFormat(this.isObject(element, column), "YYYY-MM-DD hh:mm:ss a")
    },

    moneyField(element: any, column: any) {
      return `$ ${parseFloat(this.isObject(element, column)).toFixed(column.precision || 2)}`
    },

    floatField(element: any, column: any) {
      return parseFloat(this.isObject(element, column)).toFixed(column.precision || 2)
    }
  }
}
</script>

<template>
  <td
    class="px-3 py-2"
    :class="{'text-right': ['integer', 'float', 'money'].includes(column.format)}"
    v-text="nestedColumn(entry, column)"
  ></td>
</template>
