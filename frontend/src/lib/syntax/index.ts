export type Language =
	| 'plaintext'
	| 'javascript'
	| 'typescript'
	| 'python'
	| 'c'
	| 'cpp'
	| 'go'
	| 'dockerfile'
	| 'json';

export type LanguageOption = { value: Language; label: string };

export const languages: Record<Language, string> = {
	plaintext: 'Plain Text',
	javascript: 'JavaScript',
	typescript: 'TypeScript',
	python: 'Python',
	c: 'C',
	cpp: 'C++',
	go: 'Go',
	dockerfile: 'Docker',
	json: 'JSON'
};

export const selectableLanguages: Language[] = [
	'plaintext',
	'javascript',
	'typescript',
	'python',
	'c',
	'cpp',
	'go'
];

export const languageOptions: LanguageOption[] = selectableLanguages.map((language) => ({
	value: language,
	label: languages[language]
}));
