const template = `
  <td
    class="px-3 py-2"
    :class="{'text-right': ['integer', 'float', 'money'].includes(column.format)}"
    v-text="nestedColumn(entry, column)"
  ></td>
`;

export default {
  props: ["entry", "column"],

  template,

  methods: {
    nestedColumn(element, column) {
      if (!column.name.includes(".")) {
        return this.format(element, column);
      }

      if (!element[column.name.split(".")[0]]) {
        return null;
      }

      return this.format(element = column.name.split(".").reduce((item, index) => item[index], element), column)
    },

    isObject(element, column) {
      return typeof element === "object" && element ? element[column.name] : element;
    },

    format(element, column) {
      if (
        column.format
        && ["float", "money", "date", "datetime"].includes(column.format)
      ) {
        return this[`${column.format}Field`](element, column);  
      }

      return this.isObject(element, column);
    },

    dataFormat(data, format) {
      return data ? this.moment(data).format(format) : null;
    },

    dateField(element, column) {
      return this.dataFormat(this.isObject(element, column), "YYYY-MM-DD");
    },

    datetimeField(element, column) {
      return this.dataFormat(this.isObject(element, column), "YYYY-MM-DD hh:mm:ss a");
    },

    moneyField(element, column) {
      return `$ ${parseFloat(this.isObject(element, column)).toFixed(column.precision || 2)}`;
    },

    floatField(element, column) {
      return parseFloat(this.isObject(element, column)).toFixed(column.precision || 2);
    }
  }
};
