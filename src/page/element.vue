<template>
    <div>
        <!-- <Button /> -->
        <!-- <Link /> -->
        <!-- <Radio /> -->
        <!-- <Checkbox /> -->
        <!-- <Input /> -->
        <!-- <Select /> -->
        <!-- <Cascader /> -->
        <!-- <Switch1 />
        <Slider /> -->
        <!-- <Timepicker />-->
        <!-- <Datepicker /> -->
        <!-- <Upload /> -->
        <!-- <Form /> -->
        <Table />
        <Pagination />
        <Dialog />
    </div>
</template>
<script>
    import Button from "../element/form/button.vue";
    import Link from "../element/form/link.vue";
    import Radio from "../element/form/radio.vue";
    import Checkbox from "../element/form/checkbox.vue";
    import Input from "../element/form/input.vue"
    import Select from "../element/form/select.vue";
    import Cascader from "../element/form/cascader.vue"
    import Switch1 from "../element/form/switch.vue"
    import Slider from "../element/form/slider.vue"
    import Timepicker from "../element/form/timepicker.vue"
    import Datepicker from "../element/form/datepicker.vue"
    import Upload from "../element/form/upload.vue"
    import Form from "../element/form/form.vue"
    import Table from "../element/table/table.vue"
    import Pagination from "../element/table/pagination.vue"
    import Dialog from "../element/pop/dialog.vue"

    export default {
        components: { Button, Link, Radio, Checkbox, Input, Select, Cascader, Switch1, Slider, Timepicker, Datepicker, Upload, Form, Table, Pagination, Dialog }
    }
</script>