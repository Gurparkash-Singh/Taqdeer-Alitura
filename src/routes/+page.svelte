<script>
    import BackgroundImage from "$lib/images/homepage.avif?enhanced";
    import Logo from '$lib/images/Logo.png?enhanced';
    import { modal } from '$lib/shared_state/shared.svelte';

    let { form, data } = $props();

    let verticalScrollPos = $state(0);
    let arrow1;
    let svgHolder1;
    let arrow2;
    let svgHolder2;
    let windowHeight = $state(0);
    let bodyHeight = $state(0);
    let arrow1ScrollTo = $state(0);
    let arrow2ScrollTo = $state(0);
    let arrow1aria = $state("Scroll to about");
    let arrow2aria = $state("Scroll to Contact")

    let home;
    let about;
    let contact;

    let email = $state(data.user ? data.user.email : "");
    let emailBody = $state("");
    let enableSend = $state(false);

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (form.invalid) {
            email = form.email;
            emailBody = form.body;
        }

        if (!inMessages && form.invalid) 
        {
            modal.messages.push({
                heading: "ERROR",
                paragraph: form.message
            });
        }else if (!inMessages && form.success) {
            modal.messages.push({
                heading: "SUCCESS",
                paragraph: form.message
            });
        }
    }

    $effect(() => {
        if (verticalScrollPos > windowHeight / 2) {
            arrow1.style.rotate = "180deg";

            arrow2.style.visibility = "visible";
            svgHolder2.style.position = "absolute";
            svgHolder2.style.top = "calc(200vh - 85px)";

            arrow1ScrollTo = 0;
        }
        else {
            arrow1.style.rotate = "0deg";
            arrow1ScrollTo = 1;

            arrow2.style.visibility = "hidden";
        }

        if (verticalScrollPos > windowHeight*1.4) {
            arrow2.style.rotate = "180deg";
            arrow2ScrollTo = 0;
        }
        else {
            arrow2.style.rotate = "0deg";
            arrow2ScrollTo = 1;
        }

        if (verticalScrollPos > windowHeight - 60) {
            svgHolder1.style.position = "fixed";
            svgHolder1.style.top = "20px";
        }
        else {
            svgHolder1.style.position = "absolute";
            svgHolder1.style.top = "calc(100vh - 40px)";
        }

        if (verticalScrollPos > windowHeight * 2 - 105) {
            svgHolder2.style.position = "fixed";
            svgHolder2.style.top = "20px";
        }
        else {
            svgHolder2.style.position = "absolute";
            svgHolder2.style.top = "calc(200vh - 68px)";
        }

        if (email && emailBody) {
            enableSend = true;
        }
        else {
            enableSend = false;
        }
    })

</script>

<svelte:window bind:scrollY={verticalScrollPos} bind:innerHeight={windowHeight}/>

<div id="image-holder">
    <enhanced:img 
        src={BackgroundImage}
        alt="background"
        style:object-fit="cover"
        style:object-position="center center"
        style:width="100vw"
        style:height="100vh"
    >
</div>

<div id="svg-holder1" bind:this={svgHolder1}>
    <button
        class="arrow-button"
        bind:this={arrow1}
        onclick={() => {
            if (arrow1ScrollTo == 0) {
                if(arrow2ScrollTo == 0) {
                    about.scrollIntoView();
                }
                else {
                    home.scrollIntoView();
                }
            }
            else {
                about.scrollIntoView();
            }
        }}
        aria-label={arrow1aria}
    >
        <svg 
            width="20"
            height="20"
            viewBox="0 0 74 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="scroll-arrow"
        >
            <path
                d="M33.4645 40.5355C35.4171 42.4882 38.5829 42.4882 40.5355 40.5355L72.3553 8.71573C74.308 6.76311 74.308 3.59728 72.3553 1.64466C70.4027 -0.307962 67.2369 -0.307962 65.2843 1.64466L37 29.9289L8.71573 1.64466C6.76311 -0.307959 3.59728 -0.307959 1.64466 1.64466C-0.307962 3.59728 -0.307962 6.76311 1.64466 8.71573L33.4645 40.5355ZM32 35L32 37L42 37L42 35L32 35Z"
                fill="white"
            />
        </svg>
    </button>
</div>

<div id="svg-holder2" bind:this={svgHolder2}>
    <button
        class="arrow-button"
        bind:this={arrow2}
        aria-label={arrow2aria}
        onclick={() => {
            if (arrow2ScrollTo == 1) {
                contact.scrollIntoView();
            }
            else {
                about.scrollIntoView();
            }
        }}
    >
        <svg width="20" height="20" viewBox="0 0 74 42" fill="none" xmlns="http://www.w3.org/2000/svg" id="scroll-arrow2">
            <path
                d="M33.4645 40.5355C35.4171 42.4882 38.5829 42.4882 40.5355 40.5355L72.3553 8.71573C74.308 6.76311 74.308 3.59728 72.3553 1.64466C70.4027 -0.307962 67.2369 -0.307962 65.2843 1.64466L37 29.9289L8.71573 1.64466C6.76311 -0.307959 3.59728 -0.307959 1.64466 1.64466C-0.307962 3.59728 -0.307962 6.76311 1.64466 8.71573L33.4645 40.5355ZM32 35L32 37L42 37L42 35L32 35Z"
                fill="white"
            />
        </svg>
    </button>
</div>

<main bind:clientHeight={bodyHeight}>
	<section id="logo" bind:this={home}>
		<enhanced:img 
            src={Logo}
            alt="Taqdeer Alitura Logo" 
            class="logo-image"
        />
		<h1>TAQDEER</h1>
		<h1>ALITURA</h1>
	</section>
	<section id="about" bind:this={about}>
		<h1>ABOUT US</h1>
		<p>
			Taqdeer Alitura is a streetwear label that stands for inclusion and equality by seamlessly
			bridging the unacquainted. The words Taqdeer, an Arabic word for appreciation or a Kazakh word
			for destiny, and Alitura, a Latin word for sustenance and a reminder of the interconnectedness
			of nature, together could roughly translate to naturally destined or appreciation for nature.
			The name hints at the mission and philosophy of the brand; to reinvent Middle Eastern fashion
			by creating a culture of love for what was and where it has taken us. This push, in the
			brand's beginnings and for as long as possible, will, as the name suggests, leverage Arabic
			culture, an appreciation for nature, and contemporary western fashion as placeholders in the
			marriage it promises to deliver on.
		</p>
	</section>
	<section id="contact" bind:this={contact}>
		<h1>CONTACT</h1>
		<div>
			<p id="contact-p">
                Please feel free to write to us regarding anything you might need.
            </p>
			<form action="?/send" method="POST" id="contact-form-element">
				<textarea 
                    name="contact-form"
                    id="contact-form"
                    rows="3"
                    cols="5"
                    placeholder="Contact Us"
                    bind:value={emailBody}
                ></textarea>
                <!-- <div id="form-controls"> -->
                    <p>
                        <label for="email">Email: </label>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            placeholder="example@example.com"
                            bind:value={email}
                        >
                    </p>
                    <input 
                        type="submit" 
                        value="Send" 
                        id="form-button"
                        class:enable-send={enableSend}
                        class:disable-send={!enableSend}
                        disabled={!enableSend}
                    >
                <!-- </div> -->
			</form>
			<ul>
				<li>
					<a 
                        href="https://www.linkedin.com/company/taqdeer-alitura/"
                        aria-label="linkedin link"
                    >
						<svg
							width="24"
							height="27"
							viewBox="0 0 42 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M28.3333 13.6667C31.2507 13.6667 34.0486 14.8257 36.1115 16.8886C38.1744 18.9515 39.3333 21.7494 39.3333 24.6667V37.5001H32V24.6667C32 23.6943 31.6137 22.7617 30.926 22.074C30.2384 21.3864 29.3058 21.0001 28.3333 21.0001C27.3609 21.0001 26.4282 21.3864 25.7406 22.074C25.053 22.7617 24.6667 23.6943 24.6667 24.6667V37.5001H17.3333V24.6667C17.3333 21.7494 18.4922 18.9515 20.5551 16.8886C22.618 14.8257 25.4159 13.6667 28.3333 13.6667Z"
								stroke="#F5F5F5"
								stroke-width="4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M9.99999 15.5001H2.66666V37.5001H9.99999V15.5001Z"
								stroke="#F5F5F5"
								stroke-width="4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M6.33332 10.0001C8.35837 10.0001 9.99999 8.35846 9.99999 6.33341C9.99999 4.30837 8.35837 2.66675 6.33332 2.66675C4.30828 2.66675 2.66666 4.30837 2.66666 6.33341C2.66666 8.35846 4.30828 10.0001 6.33332 10.0001Z"
								stroke="#F5F5F5"
								stroke-width="4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
				</li>
				<li>
					<a 
                        href="https://www.instagram.com/taqdeeralitura" 
                        aria-label="instagram link"
                    >
						<svg
							width="24"
							height="24"
							viewBox="0 0 42 42"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M31.0833 10.9167H31.1017M11.8333 2.66675H30.1667C35.2293 2.66675 39.3333 6.7708 39.3333 11.8334V30.1667C39.3333 35.2294 35.2293 39.3334 30.1667 39.3334H11.8333C6.77071 39.3334 2.66666 35.2294 2.66666 30.1667V11.8334C2.66666 6.7708 6.77071 2.66675 11.8333 2.66675ZM28.3333 19.8451C28.5596 21.3709 28.299 22.9291 27.5885 24.2983C26.8781 25.6674 25.7541 26.7777 24.3763 27.4711C22.9985 28.1646 21.4371 28.406 19.9143 28.161C18.3914 27.9159 16.9846 27.1969 15.8939 26.1062C14.8032 25.0155 14.0842 23.6087 13.8391 22.0858C13.5941 20.5629 13.8354 19.0016 14.5289 17.6238C15.2224 16.246 16.3327 15.1219 17.7018 14.4115C19.0709 13.7011 20.6292 13.4405 22.155 13.6667C23.7113 13.8975 25.1522 14.6228 26.2648 15.7353C27.3773 16.8479 28.1025 18.2887 28.3333 19.8451Z"
								stroke="#F5F5F5"
								stroke-width="4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
				</li>
				<li>
					<a href="https://www.tiktok.com/@taqdeeralituraofficial" aria-label="tiktok link">
						<svg
							width="26"
							height="26"
							viewBox="0 0 46 46"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
						>
							<rect width="46" height="46" fill="url(#pattern0_40_117)" />
							<defs>
								<pattern
									id="pattern0_40_117"
									patternContentUnits="objectBoundingBox"
									width="1"
									height="1"
								>
									<use xlink:href="#image0_40_117" transform="scale(0.00195312)" />
								</pattern>
								<image
									id="image0_40_117"
									width="512"
									height="512"
									xlink:href="data:image/png;base64,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"
								/>
							</defs>
						</svg>
					</a>
				</li>
				<li>
					<a href="mailto:admin@taqdeeralitura.com/" aria-label="email link">
						<svg
							width="28"
							height="22"
							viewBox="0 0 48 38"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.33334 37.6666C4.05 37.6666 2.95139 37.2096 2.03751 36.2958C1.12362 35.3819 0.666672 34.2833 0.666672 32.9999V4.99992C0.666672 3.71659 1.12362 2.61797 2.03751 1.70409C2.95139 0.790196 4.05 0.333252 5.33334 0.333252H42.6667C43.95 0.333252 45.0486 0.790196 45.9625 1.70409C46.8764 2.61797 47.3333 3.71659 47.3333 4.99992V32.9999C47.3333 34.2833 46.8764 35.3819 45.9625 36.2958C45.0486 37.2096 43.95 37.6666 42.6667 37.6666H5.33334ZM24 21.3333L5.33334 9.66659V32.9999H42.6667V9.66659L24 21.3333ZM24 16.6666L42.6667 4.99992H5.33334L24 16.6666ZM5.33334 9.66659V4.99992V32.9999V9.66659Z"
								fill="#FEF7FF"
							/>
						</svg>
					</a>
				</li>
				<li>
					<a href="https://x.com/taqdeeralitura" aria-label="twitter link">
						<svg
							width="24"
							height="24"
							viewBox="0 0 44 44"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
						>
							<rect width="44" height="44" fill="url(#pattern0_40_116)" />
							<defs>
								<pattern
									id="pattern0_40_116"
									patternContentUnits="objectBoundingBox"
									width="1"
									height="1"
								>
									<use xlink:href="#image0_40_116" transform="scale(0.00195312)" />
								</pattern>
								<image
									id="image0_40_116"
									width="512"
									height="512"
									xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAMFBMVEVHcEz9/f35+fno6Oj8/Pz19fX+/v7+/v7+/v79/f3+/v7+/v7+/v7+/v7////+/v5Bl9IyAAAADnRSTlMAaCYKPBfRtppT8njlidppWzkAAA6qSURBVHja7Z1tcqRIEkRFAsk3cf/b7o9dW7MZ2VhL5WROBPHeAbpaXSXKeel4fwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQFy2wTvjVzKGR5n+9AGw2znLVy6u+0nOWXg9JwxfmTjuJ7Hy9Ufq7RybvvKwWfd/unm/nbPPX1mYnn3/N+FFHWFpYkB59v0/hK8dXxxfKZjP+0mur5+y3H+HGPAvMNYmt0/EgCgs95PU8TfZAxuQSgB8Z7j/BjGgN0NTARA/BtwTAqBlaBpPYkAiAaDfgvbHKgJAEQDxY4BdCABBAPyZ9f4rxICoAkD4a/jGZgSAIADix4C7IgA0ARC+HXIhACQBEL4dYhsCQBIA8dshBQEg/ILEPxayOiIA/iAAJCZiQGABsDYoJfpjQwD8A0urm1JiQHwB8KZ2SB0RAIoAiB8DVgTAd6w0/IsRA4ILgNe1QwoCQBAA8dshdo4IAEUAxG+HrAgAKRXFb4cMCIAPBIDWDsEGRBQAr22HnCMC4A8CQKJgA94mAPTbVJYjYgsA/TpFDAgkAHSIAa8TAPqxEI+MxhEAOhMx4HUCQG+HsBzhXgBkOhY6ZwTAFzEAAZA3BtiBAOj6oSUGuBEA3mOLTeU3DPdn2D4jAAQatkOWTgeQCwLA6Sf36HSLfCAAnMaAqc8nzSYEQFPWTosO2+cDUggAn5evSgxoIgDiBNir0wHkgQBw+hNsnT5pEwLA53eYlT6fNJsRAE2pQmujyyetIgBcHgvZvXb5pJldCICmTNantTHbx9+NCICmHM5jgNmMAGjKQgxwLQAct0OWToHzQgCEjgH6J21DAPi8oNnU5R/OrCAAfMaAfe4TOOuIAAjcDtE/abYiAGIfC+kxAAEQuR2i5ycrCIDY7RA9BiAAIrdD9EvoigAgBiAAArdD9H/FggCI3A7RY8A5IgCaUoWFzz4xAAHg81jI1k7eaUAAxD4W0m0AAuAV7ZDh8xiAAAjcDtFfxxYEQOR2iB4DbEAA+PxR7ehyT202IQBit0P0GIAACN0O0R8ZRQDEbofoNgABEPtYSF+OQADkjgH7jAAI3A7RX8cWBEDodogeAw4EADGgA2Vn/vS3bL0GpBAAodshug1AAMTeDtF3JBEAsbdD9AEpBEDkdogeN/YZAeCzHXKXLr9pVhEAbVmcxwC7EACR2yF6N+CeEABOY8DRa0cSAeAyCJlNnWIAAiB2O0QfkEIAxG6H6DuSCIDYx0L6syIIAKftkK1TDBgRAC7bIWa9YgACwGs7ZOxiHWxDABADEACR2yH6gBQCIHQ7RF+OQADE3g7RB6QQALG3Q/QYgAB4RTvk+PxSgwAIvR2iz0kjALy2QzrZgAEBELsdoscABEDs7RB9OQIBEPqhYd0GIABit0P05QgEQOx2iB4DEACxj4X0GIAAiNwO0b9sFgRA7HaIHgMQALHbIfpyBAKAGIAA8NkO8bgcsSIA+t0zlz5z0se/JQDs4wfW2Q55NgYgAJweC61dBqRsnxEAodshegxAALxhO0QfkNIFgP6aHAv9hb1XDEAAOC2JLr12JBEAobdD9BiAAIjdDtFjAAIgdjtE35FEAMRuh+gDUgiA0MdC+nIEAiBwO0RXz2YXAsDr/yxTOg1IIQB8tkOsjkIMUGtICIDIMUD/L4yW2xAAUdoh+oAUAqAtl/sYgABwux3SQz2bFQRA6HaIHgNGBEDkdoiuni8EgNftkKnTgBQCIPZ2iP7IKAIg9naIviOJAAjdDtGXIxAAbRncxwAEQOh2iH6pKQgAp+2Q2icGnAgAn8dCZlefSw0CIHI7RI8BCADH2yGlfQxAAERuh+iXGh4BcN0OsbVxDEAAOG+H2Nb0jgMBEHo7RL/UIAAib4foMQAB8L52yIoAyN0OGU8EQO52SDEEQO52yIAASN4OWREAudsh44kAyN0OKYYAyN0O2RAAb2uHWP1dDEAAvO5Y6Prd+SMC4GUxwH53pS2GAMjdDtkMAZC7HXIhACLHAP3rdqwIgNzbIcUQALm3QzZDAORuh1wIgOTtkIoAyN0OmQ0BkLsdMhkCwClLn/+B/0IAJG+HVARA7nbIvCMAcrdDJkMA5G6HHAiA5NshCwIg93bIvCMAcm+HTIwAJm+HHAiA5O2QBQGQeztk3hEAudshkyEAcm+HDAiA5O2QBQGQux0yngiA3O2QyRAAudshAwIgeTtkQQDkboeMJwIgdzukGDeAThl8xwA7SYCh2yH66RMOIPZ2iB4DBt6jV2yHFOM2IOV2iD4gRQxozdrnHn3lKOBt7ZC7jsQAtkN+TDFs0OvaIcQA2iG/YOVEOHc7ZKzEgJztED1tEANCt0P0tHFSC3hHO+QiBiRvh1ROhnO3Q2ZsQM52iB4DaAe2ZiAGEAM+YycGsB3yc2ZsQPJ2yEQMyLkdoseAylsUeTtEjwF28Ra9oh0y79iAlO0QPQYYMeAd7ZCDGJC8HbIQA3K3Q+adxaCXHQuZLT1igPGsiEDjt2YgBtAO6XD2QAyIfSykVxCIAV7bIb+MATwymrwdMrAdFvpYSD+zXXhkNHcMGE9iQOp2yMhyRPZ2yMAjoy9shzAgxXYIyxG0Q35I4VDghe0QYgDtEAakaIcQA2iHNP6uIQb4fWiYASnaIR1sAI+Mhm6H6LecRgzweixk+8yOJO0QYgDtEHYk2Q5hOSJpDLAeMcCIAY7bIQxIhUb/5bwYkKIdQgxIHQMKO5KpqwF3HYkBmWTQd1ZiQJ5ymN4OqTwy6o5xuTUKA1KhWW+Rc2RAKjDHrWJLh9czYzmiCYPdMjYwIBX5LFDHph4rRQxIORAAwn263kMjBrQSADoLA1KhBYDOwYBUaAGgM7EjGVkA6NjMgFQaAaDfpx8MSDkTADp2EQMiCwAd2xiQiiwAdKwQAyILAJ06siMZWQDorOxIRhYAOjYQAyILAB0rLEdEFgA6Z48YYDwyqgmAliwMSAUWADp2DwxIpREAejuEOWlvAkDH9pkdycACQMeIAbEFgM5BDIgsAHRsYkAqsgDQsZkBqcACQMcqA1JpBIDe2xgrMcCZANCxrcvfjRjgQAAIpkZejjh5VkS4yraljixHZBEAuqkZGZByJwB0BmxAYAGgY1YYkIosAHROYkBkAaBjCzuSaQSAXhKdsQGhBYAe0SZiQGgBoL83F8sRoQWAHtEqA1LeBIDOwY5kaAGgM7EjGVkA6NjMgNQbBIB9fHmu7Ei+QQAcn/95FwNS8QXAKuh629iRjC4AFuk+3QoxILYAqKOm6+vIgFRf1iY+b957tEPmneUIZwKg6PfpAwNSYQWATQ98sqwwIBW1AbA98gV9jgxIBRUAD31BLwxIxRQAj11eiAEhBcBzX9D3xHJERAHwjVXYDulwKLAiABoVevQv6IXliFgCwMrDKfPokGXNCgKgcaVzIwbkEADPf9HYzIBUHAHQ4lajEgPCCIAmX9D3xZx0OAHwHakdwoBUMAHwnebtEN05LAiAhk/0qO2QDpc1GxAAAlZaRo6V5YiYAuC5YyFigHMB0PaqY1bYkYwkAL6jt0MYkIonAL4z7kJI73AoMCEAWl059ZIoA1J+BUCPAxubGJByKgA6vfo+MyAVTgD8a+2QGRvwT2wdBcDT7RBiQCwB8Hg7hBgQSgA0aIcQAwIJgCbtEHYkXQmA/tehiwGpaAKgfztEP3qoCAA5Lrtoh9RPlfCFABDfCQftECHymG0IAEkANG2HMCDlXgA0bocQAzwIAAF5O4QBKdcCoEM7hB3JoALgqe0QliNcCIAgMYABKS8C4MntEGJAVAHQfztk/HxHEgHQuDExnsSABAKgTTuEHUl/AqBvO4QdSW8CoHc7hB1JXwLAYztE/x4sCADhK9FBO0SMAXaOCABBALS9S9l63HGuCADhpqh1O4QBKQcCQKcKx0IdliMKAkDIw22bOys7kr4EQP9jIXYkHQgAnYMYEFoA6CzEgAQCoMmR3cKAVDcB4DQGMCDlVgC42Q7RvxkHBICAg+0Q+d5oQgAIOGiHqL8c54wAcPsXP1iO8CUA+rdD2JH0JQD6t0OYk+4vAFy1QxiQ6i8AfLVDiAG9BYC3dggDUn0FgL92CDuSDgSATu3R3ps+jwEIAK+3sbb2uNBUBEDoYyH9QnMhAAQctEPkGtqEAIjdDtF3JBEAoY+F9OUIBIDbGGBHhwuNXQiA2O0QfUAKARC7HaLvSCIAiAEIgMDtEH1ACgHwinbI/IYBKQcCIGA7RB+QQgDEbofoA1IIgNDtEH1ACgEQux2iD0ghAGK3Q/QYgAAQcLAdoi9HIACc/oR2r+1jgNmKAIjdDtFjAALA711O6fFVWhAArVmIAZEFgM4sHAv1GJBCAPiNAUeXASkEgNd2iNnUJQYgAGK3Q/QYgABozOg6BtiCAIh8LKR/zGxAALhth9jWZTkCAeD1Zzabu+xIIgBCt0P0HUkEQOwYoA9IIQBe0Q4p9rFyQADEbofoA1IIgNDbIfqAFAIg9naIPiCFAIjdDtEHpBAArTmcxwAEQOh2iB4DEACxj4X0GIAAiLwdoseAe0IAxN4O0QekEACB2yF6DLCKAPAbA+r6cz5WwhcCwLENt9t+hPAKtiEAWrPdjjGbEQDtY4BjrCIAmlNvz1wIgA4xwDG2IQA6tEMcYwUB0Jrr9kwdEQDEAARA63aIZzYEQGsm5zEAAdCa4/ZMHREArVluz6wIgA7bIZ7ZEAC5Y8BdEACtGW7H2DkiAHIfC60IgA7tEM8MCIDkx0IFAZC6HXKfIwIgdQy4VwRA8mOhAQFADEAAZG6HnCMCIHc7ZEEAJD8WGhAAydshEwIg97HQOSMAcrdDFgRA8hhwIAByHwvZhADIHQP2GQGQuh1yLwiA5MdCBwKAGIAAyHwstM8IgNztkIoASB0DzC4EQO52iE0IgOTtkBkBkNsHVQRA7naIXQiA3MdCtiEAUrdDzGYEADEAAZC5HXIhAIgB/2cbnoTf//8xDg/D2wQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/lP1rvQDSsU4VeAAAAAElFTkSuQmCC"
								/>
							</defs>
						</svg>
					</a>
				</li>
			</ul>
		</div>
	</section>
</main>

<style>
	main {
		margin: auto;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 2;
		color: white;
	}

    .arrow-button {
        background: transparent;
        border: none;
    }

	#image-holder {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}

	#logo {
		display: flex;
		height: 100vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
        position: relative;
	}

    .logo-image {
        width: 150px;
        height: auto;
        position: absolute;
        transform: translate(-50%, -35%);
    }

	#logo h1 {
		margin: 0;
		font-size: 20px;
		position: relative;
		top: 7px;
        color: white;
	}

    #svg-holder1 {
        z-index: 3;
        left: calc(50% - 10px);
    }

    #svg-holder2 {
        z-index: 2;
        left: calc(50% - 10px);
    }

	#about {
		margin: -25px 25px;
        height: 100vh;
        display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#about h1 {
		text-align: center;
        color: white;
	}

	#about p {
		background-color: #cb2d2d;
		padding: 15px 25px;
		color: white;
        font-size: 14px;
        max-width: 89%;
        line-height: 1.5;
	}

	#about p::first-letter {
		padding-left: 50px;
	}

	#contact {
		margin: 0 25px;
		z-index: 2;
        position: relative;
        height: 100vh;
        display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#contact h1 {
		text-align: center;
        color: white;
	}

	#contact div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 15px 25px;
		background-color: #cb2d2d;
		color: white;
        position: relative;
        max-width: 89%;
        font-size: 14px;
	}

    #contact p {
        color: white;
        line-height: 1.5;
    }

	#contact-p::first-letter {
		padding-left: 50px;
	}

	#contact textarea {
		width: 100%;
		height: 150px;
        resize: none;
        font-size: 14px;
	}

    #contact label {
        color: white;
        margin: 0 4px 0 0;
    }

	#contact ul {
		list-style: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	#contact ul li {
		margin: 3px;
        color: white;
	}

    #form-button {
        background: white;
        border: none;
        padding: 5px 20px;
        cursor: pointer;
    }

    .enable-send {
        color: #1E1E1E;
    }

    .disable-send {
        color: #1E1E1E66;
    }

    #contact-form-element {
        width: 100%;
        text-align: center;
    }

    #contact-form-element p {
        display: inline-flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        margin: 20px 10px 10px 0;
    }

    #contact-form-element p input {
        background: transparent;
        border: none;
        border-bottom: 2px solid white;
        color: white;
    }

    #contact-form-element input[type="text"] {
        max-width: 160px;
        width: 100%;
    }

    #contact-form-element input[type="submit"] {
        margin-bottom: 20px;
        display: inline;
    }

    /* @media screen and (width >= 430px) {
        #contact-form-element p {
            margin: 20px 0 10px 10px;
        }
    } */

	@media screen and( width >= 1000px) {
		#logo h1 {
			font-size: 20px;
			top: 7px;
		}

        .logo-image {
            width: 100px;
        }
	}
</style>