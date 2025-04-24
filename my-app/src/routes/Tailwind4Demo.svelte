<script>
    // No script needed for this simple demo
</script>

<div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <h2 class="text-xl font-bold text-michas mb-4">Tailwind CSS 4 Features</h2>

    <div class="space-y-6">
        <!-- New color opacity syntax -->
        <section>
            <h3 class="text-lg font-semibold mb-2">New Color Opacity Syntax</h3>
            <div class="flex flex-wrap gap-2">
                <div class="bg-michas/75 p-2 rounded text-white">bg-michas/75</div>
                <div class="bg-michas/50 p-2 rounded text-white">bg-michas/50</div>
                <div class="bg-michas/25 p-2 rounded">bg-michas/25</div>
            </div>
        </section>

        <!-- Arbitrary properties -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Arbitrary Properties</h3>
            <div class="space-y-2">
                <div class="[mask-type:luminance] bg-michas p-2 rounded text-white">
                    [mask-type:luminance]
                </div>
                <div class="[text-wrap:balance] bg-gray-100 p-2 rounded">
                    [text-wrap:balance] This is a long text that should be balanced across multiple lines when wrapped.
                </div>
            </div>
        </section>

        <!-- Arbitrary values -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Arbitrary Values</h3>
            <div class="space-y-2">
                <div class="w-[347px] bg-blue-200 p-2 rounded">w-[347px]</div>
                <div class="h-[calc(100vh-20rem)] max-h-[50px] bg-blue-300 p-2 rounded">
                    h-[calc(100vh-20rem)] max-h-[50px]
                </div>
                <div class="text-[22px] text-michas">text-[22px]</div>
                <div class="grid grid-cols-[1fr_500px_2fr] gap-2">
                    <div class="bg-green-200 p-2 rounded">1fr</div>
                    <div class="bg-green-300 p-2 rounded">500px</div>
                    <div class="bg-green-400 p-2 rounded">2fr</div>
                </div>
            </div>
        </section>

        <!-- Custom sizes from config -->
        <section>
            <h3 class="text-lg font-semibold mb-2">Custom Sizes from Config</h3>
            <div class="space-y-2">
                <div class="w-special bg-purple-200 p-2 rounded">w-special (45.5%)</div>
                <div class="text-mega text-michas">text-mega (4rem)</div>
                <div class="rounded-special bg-yellow-200 p-2">rounded-special (0.625rem)</div>
            </div>
        </section>
    </div>
</div>
