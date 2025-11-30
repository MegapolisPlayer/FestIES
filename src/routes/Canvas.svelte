<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const SNOWFLAKE_LIMIT = 10000;

	let canvas: HTMLCanvasElement | undefined = $state();
	let context: CanvasRenderingContext2D | undefined = $state();
	let snowflakeImage: HTMLImageElement | undefined = $state();

	let sizeX = 0;
	let sizeY = 0;

	let value = $state(crypto.randomUUID());

	let snowflakes: {
		x: number;
        xSpeed: number;
		y: number;
		rotation: number;
		rotationSpeed: number;
		opacity: number;
	}[] = [];

	onMount(async () => {
		snowflakeImage = new Image();
		snowflakeImage.src = '/snowflake-line.png';

		await new Promise((resolve) => {
			snowflakeImage?.addEventListener('load', (r) => {
				resolve(0);
			});
		});

		canvas = document.getElementById(value) as HTMLCanvasElement;
		let context = canvas.getContext('2d') as CanvasRenderingContext2D;

		sizeX = canvas.getBoundingClientRect().width;
		sizeY = canvas.getBoundingClientRect().height;

		context.canvas.width = sizeX;
		context.canvas.height = sizeY;
		context.strokeStyle = `rgb(255, 255, 255, 127})`;
		context.lineWidth = 7;

		new ResizeObserver(() => {
			context?.clearRect(0, 0, sizeX, sizeY);
			snowflakes = [];

			context = canvas?.getContext('2d') as CanvasRenderingContext2D;
			sizeX = canvas?.getBoundingClientRect().width ?? 0;
			sizeY = canvas?.getBoundingClientRect().height ?? 0;
			if (context != null) {
				context.canvas.width = sizeX;
				context.canvas.height = sizeY;
			}
		}).observe(canvas);

		setInterval(() => {
			if (snowflakes.length >= SNOWFLAKE_LIMIT) return;

            //horizontal spawn or vertical?
            let val = Math.random() < (sizeY/sizeX);
            let x = val ? -12 : Math.trunc(Math.random() * (sizeX));
            let y = val ? Math.trunc(Math.random() * (sizeY)) : -12;

			const o = {
				x: x,
                xSpeed: 1+Math.random()*2,
				y: y,
				rotation: Math.trunc(Math.random() * 360),
				rotationSpeed: (1-Math.round(Math.random())*2) * 3,
				opacity: 0.3 + Math.random() / 3
			};

			snowflakes.push(o);
		}, 100);

		setInterval(() => {
			context?.clearRect(0, 0, sizeX, sizeY);
			for (let i = snowflakes.length - 1; i >= 0; i--) {
				snowflakes[i].x += snowflakes[i].xSpeed;
				snowflakes[i].y += 3;

                //randomization (vibration)
                snowflakes[i].x += Math.trunc(Math.random()*2-1);

				snowflakes[i].rotation += snowflakes[i].rotationSpeed;

				if (snowflakes[i].x >= context.canvas.width || snowflakes[i].y >= context.canvas.height) {
					snowflakes.splice(i, 1);
					continue;
				} else {
					context.globalAlpha = snowflakes[i].opacity;
					context.save();
                    context.translate(snowflakes[i].x-12, snowflakes[i].y-12);
                    context.rotate((Math.PI / 180) * snowflakes[i].rotation);
					context.drawImage(
						snowflakeImage as HTMLImageElement,
                        -12, -12, 24, 24
					);
					context.restore();
				}
			}
			context.globalAlpha = 1;
		}, 50);
	});

	onDestroy(() => {});
</script>

<canvas id={value} class="absolute z-9 h-full w-full opacity-70"> Canvas element not supported! </canvas>
