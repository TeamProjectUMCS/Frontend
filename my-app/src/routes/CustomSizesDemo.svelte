<script>
    // No script needed for this simple demo
</script>

<div class="p-6 max-w-special mx-auto bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-michas mb-4">Custom Sizes Demo</h2>

    <div class="space-y-6">
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

        <!-- Custom heights -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Heights</h3>
            <div class="flex gap-4">
                <div class="h-128 w-16 bg-green-200 rounded flex items-center justify-center">
                    <span class="transform -rotate-90">h-128 (32rem)</span>
                </div>
                <div class="h-almost-screen w-16 bg-green-300 rounded flex items-center justify-center">
                    <span class="transform -rotate-90">h-almost-screen (90vh)</span>
                </div>
            </div>
        </section>

        <!-- Custom font sizes -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Font Sizes</h3>
            <div class="space-y-2">
                <p class="text-xxs">This text is text-xxs (10px)</p>
                <p class="text-mega text-michas">This text is text-mega (64px)</p>
                <p class="text-super text-michas-light">This text is text-super (80px)</p>
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
    </div>
</div>
