<script>
  import {
    tryLogout,
    isLoggedIn,
    authenticationToken,
  } from "../stores/user.js";

  async function buttonLogoutHandler() {
    await tryLogout();
    location.replace("/login");
  }
</script>

<button
  class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
  on:click={buttonLogoutHandler}>Logout</button
>

<style></style>
