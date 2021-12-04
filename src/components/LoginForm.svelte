<script>
  import { isLoggedIn, authenticationToken, tryLogin } from "../stores/user.js";

  let objCredential = {
    username: "",
    password: "",
  };

  async function formSubmitHandler() {
    // Try to do the login
    // and let the logic do the magic
    // User checking
    // localStorage Persistent save
    await tryLogin(objCredential);

    // If success
    if (isLoggedIn.get() && authenticationToken.get()) {
      location.replace("/");
    }
    // If error
    else {
      console.log("Sorry not logged in");
    }
  }
</script>

<form class="w-full max-w-sm" on:submit|preventDefault={formSubmitHandler}>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label
        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="inline-full-name"
      >
        Username
      </label>
    </div>
    <div class="md:w-2/3">
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        id="inline-full-name"
        type="text"
        placeholder="Your Username?"
        bind:value={objCredential.username}
      />
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label
        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="inline-password"
      >
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        id="inline-password"
        type="password"
        placeholder="Your Password?"
        bind:value={objCredential.password}
      />
    </div>
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-full">
      <button
        class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded min-w-full"
        type="submit"
      >
        Login
      </button>
    </div>
  </div>
</form>

<pre
  class="mt-4">
  List of username (choose one)
  - Bret
  - Antonette
  - Samantha
  Password: whatever
</pre>

<style></style>
