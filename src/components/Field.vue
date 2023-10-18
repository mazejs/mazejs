<script setup lang="ts">
import moment from 'moment'

const props = defineProps(["entry", "column"])

const nestedColumn = (element: any, column: any) => {
  if (!column.name.includes(".")) {
    return format(element, column)
  }

  if (!element[column.name.split(".")[0]]) {
    return null
  }

  return format(element = column.name.split(".").reduce((item: any, index: number) => item[index], element), column)
}

const isObject = (element: any, column: any) => {
  return typeof element === "object" && element ? element[column.name] : element
}

const format = (element: any, column: any) => {
  if (
    props.column.format
    && ["float", "money", "date", "datetime"].includes(props.column.format)
  ) {
    return methods(column.format, element, column)
  }

  return isObject(element, column)
}

const dataFormat = (data: any, format: string) => {
  return data ? moment(data).format(format) : null
}

const fields = [
  { name: 'date', field: (element: any, column: any) => dataFormat(isObject(element, column), "YYYY-MM-DD") },
  { name: 'datetime', field: (element: any, column: any) => dataFormat(isObject(element, column), "YYYY-MM-DD hh:mm:ss a") },
  { name: 'money', field: (element: any, column: any) => `$ ${parseFloat(isObject(element, column)).toFixed(column.precision || 2)}` },
  { name: 'float', field: (element: any, column: any) => parseFloat(isObject(element, column)).toFixed(column.precision || 2) }
]

const methods = (method: string, element: any, column: any) => {
  return fields.find((element) => element.name === method)?.field(element, column)
}
</script>

<template>
  <td
    class="px-3 py-2"
    :class="{'text-right': ['integer', 'float', 'money'].includes(column.format)}"
    v-text="nestedColumn(entry, column)"
  ></td>
</template>
