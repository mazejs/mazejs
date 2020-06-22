import template from "./template/pagination.html";

export default {
  props: ["meta"],

  template,

  data() {
    return {
      currentPage: 1,
      offset: 2,
      per_page: 10,
      options: [5, 10, 15, 25, 50],
      label: {
        first: "First",
        previous: "Previous",
        next: "Next",
        last: "Last"
      }
    };
  },

  watch: {
    meta(meta) {
      this.currentPage = meta ? meta.current_page : 1;
      this.per_page = meta ? meta.per_page : 10;
    },

    currentPage(value) {
      this.$emit("action", {
        event: "paginate",
        entry: value
      });
    },

    per_page(value) {
      this.$emit("action", {
        event: "per-page",
        entry: value
      });
    }
  },

  computed: {
    pages() {
      return [...Array(this.lastPage()).keys()]
        .map(index => ++index)
        .reduce((pages, page) => {
          if (
            page - this.offset <= this.currentPage &&
            page + this.offset >= this.currentPage
          ) {
            return [...pages, page];
          }
          return pages;
        }, []);
    },

    displayMeta() {
      return this.meta
        ? `
          Showing
          ${this.meta.from || 0} to
          ${this.meta.to || 0} of
          ${this.meta.total || 0} entries
        `
        : "";
    }
  },

  methods: {
    lastPage() {
      return this.meta ? this.meta.last_page : 1;
    },

    changePage(page) {
      if (this.meta && page <= this.meta.last_page) {
        this.currentPage = page;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.lastPage()) {
        this.currentPage++;
      }
    },

    prevClass() {
      return this.setClass(this.currentPage > 1);
    },

    nextClass() {
      return this.setClass(this.currentPage !== this.lastPage());
    },

    currentClass(page) {
      return this.setClass(this.currentPage === page);
    },

    edgeClass(page) {
      return this.setClass(this.currentPage !== page);
    },

    setClass(active) {
      return {
        "bg-green-500 text-white hover:bg-green-400": active,
        "bg-gray-400 text-gray-500 hover:bg-gray-500 hover:text-white": !active
      };
    }
  }
};
