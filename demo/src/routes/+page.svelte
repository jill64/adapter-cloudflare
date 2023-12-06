<script lang="ts">
  export let data

  $: ({ date, eq } = data)
</script>

<h1>@jill64/adapter-cloudflare</h1>
<code>Buffer.from('Buffer Test').toString() = {date}</code>
<br />
<code
  >crypto.timingSafeEqual(Buffer.from('123'), Buffer.from('123')) = {eq}</code
>
