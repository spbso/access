<script lang="ts">
    import {DataTable, Pagination} from "carbon-components-svelte";

    let pagination = {pageSize: 10, page: 1};
</script>
<DataTable
        size="short"
        pageSize={pagination.pageSize}
        page={pagination.page}
        headers={[
                                    { key: "timestamp", value: "Время" },
                                    { key: "fio", value: "ФИО" },
                                    { key: "brigade", value: "Отряд" },
                                    { key: "status", value: "Статус", display: (status) => status ? "OK" : "FAIL" },
                                  ]}
        rows={[
                                {
                                  id: "a",
                                  timestamp: "17:32:34",
                                  fio: "Найден Алексей Владимирович",
                                  brigade: "СПО Северный Ветер",
                                  status: true,
                                },
                                {
                                  id: "b",
                                  timestamp: "17:32:34",
                                  fio: "Найден Алексей Владимирович",
                                  brigade: "СПО Северный Ветер",
                                  status: true,
                                },
                                {
                                  id: "c",
                                  timestamp: "17:32:34",
                                  fio: "Найден Алексей Владимирович",
                                  brigade: "СПО Северный Ветер",
                                  status: false,
                                },
                                {
                                  id: "d",
                                  timestamp: "17:32:34",
                                  fio: "Найден Алексей Владимирович",
                                  brigade: "СПО Северный Ветер",
                                  status: true,
                                },
                                {
                                  id: "e",
                                  timestamp: "17:32:34",
                                  fio: "Найден Алексей Владимирович",
                                  brigade: "СПО Северный Ветер",
                                  status: true,
                                },
                              ]}
/>
<Pagination
        bind:pageSize={pagination.pageSize}
        bind:page={pagination.page}
        totalItems={6}
        pageSizeInputDisabled
/>
