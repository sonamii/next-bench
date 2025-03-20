<template>
  <div class="px-4 py-6">
    <h1 class="text-3xl font-bold mb-4">Advanced Vue Page</h1>
    <p>This page demonstrates some advanced Vue features:</p>
    <ul>
      <li><a href="#composition-api">Composition API</a></li>
      <li><a href="#teleport">Teleport</a></li>
      <li><a href="#provide-inject">Provide/Inject</a></li>
      <li><a href="#async-components">Async Components</a></li>
    </ul>
    <hr class="my-4" />
    <section id="composition-api">
      <h2>Composition API</h2>
      <p>
        The Composition API is a new way of writing Vue components that allows you to
        write more concise and composable code. It's an alternative to the Options API.
      </p>
      <example-composition-api />
    </section>
    <hr class="my-4" />
    <section id="teleport">
      <h2>Teleport</h2>
      <p>
        Teleport is a built-in component that allows you to render a component in a
        different location in the DOM. This is useful for building things like modals.
      </p>
      <example-teleport />
    </section>
    <hr class="my-4" />
    <section id="provide-inject">
      <h2>Provide/Inject</h2>
      <p>
        Provide/Inject is a way of passing data down through a component tree without
        having to pass props at every level. It's similar to React's Context API.
      </p>
      <example-provide-inject />
    </section>
    <hr class="my-4" />
    <section id="async-components">
      <h2>Async Components</h2>
      <p>
        Async components allow you to load components lazily, which can be useful for
        speeding up the initial load time of your app.
      </p>
      <example-async-components />
    </section>
  </div>
</template>

<script lang="ts">

</script>
n