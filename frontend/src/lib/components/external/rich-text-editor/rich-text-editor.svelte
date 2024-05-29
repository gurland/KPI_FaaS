<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import type { Language } from '@/syntax';

	export let readOnly = false;
	export let height = 600;
	export let defaultValue: string = '';
	export let defaultLanguage: Language = 'plaintext';
	export let onChange: (value: string) => void;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;

	onMount(async () => {
		const monacoEditor = await import('monaco-editor');
		loader.config({ monaco: monacoEditor.default });

		monaco = await loader.init();

		editor = monaco.editor.create(editorContainer);

		const model = monaco.editor.createModel(defaultValue, defaultLanguage);

		editor.setModel(model);

		editor.onDidChangeModelContent((e) => {
			onChange(editor.getModel()?.getValue() ?? '');
		});
	});

	onDestroy(() => {
		editor?.getModel()?.dispose();
		editor?.dispose();
	});

	$: {
		if (editor) {
			const prevValue = editor.getModel()?.getValue() ?? '';
			editor.getModel()?.dispose();
			const model = monaco.editor.createModel(prevValue, defaultLanguage);
			editor.setModel(model);
		}
	}

	$: {
		if (editor) {
			editor.updateOptions({ readOnly });
		}
	}
</script>

<div class="container" style:height={`${height}px`} bind:this={editorContainer} />

<style>
	.container {
		width: 100%;
		padding: 0;
	}
</style>
