<script lang="ts">
  export let data

  $: ({ date, path } = data)
</script>

<h1>@jill64/adapter-cloudflare</h1>
<code>Buffer.from('Buffer Test').toString() = {date}</code>
<br />
<code> path.join('path', 'join', 'test') = {path}</code>
