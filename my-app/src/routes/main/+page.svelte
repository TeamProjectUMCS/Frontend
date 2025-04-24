<script lang="ts">
    import {authAPI} from "$lib/api/authApi";
    import ErrorPopup from "$lib/shared/ErrorPopup.svelte";

    let login = ""
    let password = ""
    let error = ""

</script>