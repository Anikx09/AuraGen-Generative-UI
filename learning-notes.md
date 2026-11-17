# Learning Notes: Generative AI and LLMs

Notes from the Infotact session "Introduction to Generative AI and Large Language Models", and how each topic connects to AuraGen.

## Traditional machine learning
Learns patterns from labelled data and predicts outcomes for new data.
- Classification predicts a category (spam or not spam).
- Regression predicts a number (house price).
AuraGen link: "struggling or not" is a classification problem. The prototype uses a score and a threshold of 60.

## Generative AI
Creates new content (text, code, images, audio, video) instead of only predicting a label.
AuraGen link: the AI will create the wizard steps.

## Foundation models
Very large models trained on huge datasets, reusable for many tasks without retraining.
AuraGen link: we call an existing model through an API and do not train one.

## How an LLM works
1. Input prompt
2. Tokenization (text is split into small pieces)
3. Next token prediction
4. Iterative generation (repeat until the answer is complete)
AuraGen link: the prompt will contain the form fields and ask for JSON wizard steps.

## Transformer architecture
Uses attention to focus on the important words. Processes tokens in parallel, handles long context and understands relations between words.

## Enterprise applications
Text generation, document summarization, semantic search and conversational assistants.

## LLM limitations
- Hallucination: the model can state false information confidently.
- Context window: the model can read only a limited amount of text at once. Chunking and RAG help.
AuraGen plan (not built yet): tell the model to use only the given fields, ask for JSON, check the output against the real field list in code, and fall back to the rule-based wizard if the check fails.

## Internship project steps
Define the problem, select a data source, integrate an AI model, measure outcomes.
