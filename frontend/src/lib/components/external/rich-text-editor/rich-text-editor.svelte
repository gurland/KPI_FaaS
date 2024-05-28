<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import * as Select from '$lib/components/ui/select';
	import type { Selected } from 'bits-ui';
	type Language = 'javascript' | 'typescript' | 'python' | 'c' | 'cpp' | 'go' | 'dockerfile';
	type LanguageOption = { value: Language; label: string };

	export let showLanguageSelector = false;
	export let defaultValue: string = '';
	export let defaultLanguage: Language = 'javascript';
	export let onChange: (value: string) => void;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;
	let languageOptions: LanguageOption[] = [
		{
			value: 'javascript',
			label: 'JavaScript'
		},
		{
			value: 'typescript',
			label: 'TypeScript'
		},
		{
			value: 'python',
			label: 'Python'
		},
		{
			value: 'c',
			label: 'C'
		},
		{
			value: 'cpp',
			label: 'C++'
		},
		{
			value: 'go',
			label: 'Go'
		},
		{
			value: 'dockerfile',
			label: 'Docker'
		}
	];
	let activeLanguage: Selected<string> | undefined =
		languageOptions.find((option) => option.value === defaultLanguage) ?? languageOptions[0];

	onMount(async () => {
		const monacoEditor = await import('monaco-editor');
		loader.config({ monaco: monacoEditor.default });

		monaco = await loader.init();

		editor = monaco.editor.create(editorContainer, {
			theme: 'vs-dark'
		});

		const model = monaco.editor.createModel(defaultValue, activeLanguage?.value);
		editor.setModel(model);

		editor.onDidChangeModelContent((e) => {
			onChange(editor.getModel()?.getValue() ?? '');
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div>
	<div class="container" bind:this={editorContainer} />
	{#if showLanguageSelector}
		<Select.Root
			name="language"
			selected={activeLanguage}
			items={languageOptions}
			onSelectedChange={(selected) => {
				activeLanguage = selected;
				const prevValue = editor.getModel()?.getValue() ?? '';
				editor.getModel()?.dispose();
				console.log('activeLanguage', activeLanguage);
				const model = monaco.editor.createModel(prevValue, activeLanguage?.value);
				editor.setModel(model);
			}}
		>
			<Select.Trigger id="language" class="mt-4">
				<Select.Value placeholder="Select language" />
			</Select.Trigger>
			<Select.Content>
				{#each languageOptions as languageOption}
					<Select.Item value={languageOption.value} label={languageOption.label}></Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		height: 600px;
		padding: 0;
	}
</style>
