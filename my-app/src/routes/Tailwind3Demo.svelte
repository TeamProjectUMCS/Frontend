<script>
    // No script needed for this simple demo
</script>

<div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <h2 class="text-xl font-bold text-michas mb-4">Tailwind CSS 3 Demo</h2>

    <div class="space-y-6">
        <!-- Custom colors -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Colors</h3>
            <div class="flex flex-wrap gap-2">
                <div class="bg-michas p-2 rounded text-white">bg-michas</div>
                <div class="bg-michas-light p-2 rounded text-white">bg-michas-light</div>
                <div class="bg-michas-dark p-2 rounded text-white">bg-michas-dark</div>
                <div class="text-michas">text-michas</div>
                <div class="border-2 border-michas p-2 rounded">border-michas</div>
            </div>
        </section>

        <!-- Custom spacing -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Spacing</h3>
            <div class="flex flex-wrap gap-2">
                <div class="p-xs bg-gray-200 rounded">p-xs (2px)</div>
                <div class="p-sm-plus bg-gray-200 rounded">p-sm-plus (10px)</div>
                <div class="m-sm-plus bg-gray-200 rounded inline-block">m-sm-plus (10px margin)</div>
                <div class="h-8 w-128 bg-gray-200 rounded">w-128 (32rem / 512px)</div>
            </div>
        </section>

        <!-- Custom widths -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Widths</h3>
            <div class="space-y-2">
                <div class="w-1/7 bg-blue-200 p-2 rounded">w-1/7 (14.29%)</div>
                <div class="w-2/7 bg-blue-300 p-2 rounded">w-2/7 (28.57%)</div>
                <div class="w-3/7 bg-blue-400 p-2 rounded">w-3/7 (42.86%)</div>
                <div class="w-special bg-blue-500 p-2 rounded text-white">w-special (45.5%)</div>
            </div>
        </section>

        <!-- Custom font sizes -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Font Sizes</h3>
            <div class="space-y-2">
                <p class="text-xxs">This text is text-xxs (10px)</p>
                <p class="text-mega text-michas">This text is text-mega (4rem)</p>
                <p class="text-super text-michas-light">This text is text-super (5rem)</p>
            </div>
        </section>

        <!-- Custom border radius -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Border Radius</h3>
            <div class="flex gap-4">
                <div class="h-16 w-16 bg-purple-200 rounded-xl flex items-center justify-center">
                    rounded-xl
                </div>
                <div class="h-16 w-16 bg-purple-300 rounded-2xl flex items-center justify-center">
                    rounded-2xl
                </div>
                <div class="h-16 w-16 bg-purple-400 rounded-special flex items-center justify-center">
                    rounded-special
                </div>
            </div>
        </section>

        <!-- Custom max-width -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Max Width</h3>
            <div class="space-y-2">
                <div class="max-w-8xl bg-yellow-200 p-2 rounded">max-w-8xl (90rem / 1440px)</div>
                <div class="max-w-9xl bg-yellow-300 p-2 rounded">max-w-9xl (100rem / 1600px)</div>
                <div class="max-w-special bg-yellow-400 p-2 rounded">max-w-special (68.75rem / 1100px)</div>
            </div>
        </section>

        <!-- Tailwind 3 features -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Tailwind 3 Features</h3>
            <div class="space-y-2">
                <div class="bg-michas/75 p-2 rounded text-white">bg-michas/75</div>
                <div class="w-[347px] bg-blue-200 p-2 rounded">w-[347px]</div>
                <div class="grid grid-cols-[1fr_500px_2fr] gap-2">
                    <div class="bg-green-200 p-2 rounded">1fr</div>
                    <div class="bg-green-300 p-2 rounded">500px</div>
                    <div class="bg-green-400 p-2 rounded">2fr</div>
                </div>
            </div>
        </section>
    </div>
</div>
