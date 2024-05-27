<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                    <th>Header 3</th>
                    <th>Header 4</th>
                    <th>Header 5</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Row 1, Cell 1</td>
                    <td>Row 1, Cell 2</td>
                    <td>Row 1, Cell 3</td>
                    <td>Row 1, Cell 4</td>
                    <td>Row 1, Cell 5</td>
                </tr>
                <tr>
                    <td>Row 2, Cell 1</td>
                    <td>Row 2, Cell 2</td>
                    <td>Row 2, Cell 3</td>
                    <td>Row 2, Cell 4</td>
                    <td>Row 2, Cell 5</td>
                </tr>
                <!-- Add more rows as needed -->
            </tbody>
        </table>
    </div>

</template>

<script>
 
</script>

<style scoped>
.table-container {
    width: 100%;
    overflow-x: auto;
}



th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
    white-space: nowrap; /* Prevents wrapping */
}

thead th {
    background-color: #f2f2f2;
    position: sticky;
    top: 0;
    z-index: 2;
}

tbody tr td:first-child, thead tr th:first-child {
    position: -webkit-sticky; /* For Safari */
    position: sticky;
    left: 0;
    background-color: #fff;
    z-index: 1;
}
thead tr th:first-child{
  background-color: red;
}

</style>
