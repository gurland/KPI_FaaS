package main

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"regexp"
	"strings"
)

func main() {
	directory := "output"

	mdFiles, err := filepath.Glob(filepath.Join(directory, "*.md"))
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	mermaidRegex := "(?s)\x60\x60\x60mermaid(.*?)\x60\x60\x60"
	re := regexp.MustCompile(mermaidRegex)

	allProtosFinalMermaid := "classDiagram\ndirection LR";

	for _, file := range mdFiles {
		content, err := ioutil.ReadFile(file)
		if err != nil {
			fmt.Printf("Error reading file %s: %v\n", file, err)
			continue
		}

		fmt.Printf("Searching mermaid blocks in file: %v\n", file)

		matches := re.FindAllStringSubmatch(string(content), -1)

		fileFinalMermaid := "";

		for _, match := range matches {
			fileFinalMermaid += match[1] + "\n";
		}

		allProtosFinalMermaid += strings.Replace(fileFinalMermaid, "classDiagram\ndirection LR", "", -1);
	}

    err = ioutil.WriteFile("/app/output/all_protos.mermaid", []byte(allProtosFinalMermaid), 0644)
    if err != nil {
         fmt.Printf("Error writing to file: %v\n", err)
         return
    }
}