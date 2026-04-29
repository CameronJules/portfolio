---
title: Elo Sandbox
description: Web tool that lets you give state controlled Rive animations to AI models
date: 2026-04-29
---

# Elo Sandbox

## Overview

Creating robot companions with real-time emotion + face tracking

Elo Sandbox is a tool for the design team at Elo Robotics (open-source, budget humanoid robot) to connect state-driven Rive face animations with control modules.

Version 0 is experimental but already has some cool features:

- Face tracking — the robot’s eyes follow faces via webcam
- Real-time conversational AI — controls animations for added emotional expression beyond speech
- Generalized - works with any Rive file allowing freedom for creativity
- CHOPs - Channel operators like TouchDesigner (raw inputs -> rive variables)


## Design

The team needs something easy to navigate. The goal is to make the robot face feel alive, not learn a new tool.

For this I chose to use ShadCn component library. It has well documented components that have already been designed
for simplicity and usability. 

The high level of documentation also means that AI can use it without a hitch. Allowing anyone from the design team to add features without breaking consistency and usability. 

The layout of the software mirrors Figma, as most of the design team are already familiar with this tool. This means
that common actions fit into a mental map they already have. 

## Software

The system needs to be light weight and run anywhere. So a website is the easiest choice.
Vite comes with the least extra bloat for serving the pages, and React and tailwind allow creation of resuable components.

Everything is a module just at different levels. Services provide access to raw inputs, webcam feed, audio, ect.

On top of this are modules, provide an input and modules provide an output. For example, faceTracker takes the webcam feed as input, uses mediaPipe to find faces and plot face landmarks for emotion detection and face position.

The final layers are views and viewModels. Here we display information we get from lower layers or provide access to the parts of the layer we want. Using the face tracking example, we can map the face track data onto the webcam output as an overlay, while piping the face position to our Rive file. The robot eye rive file has X, Y values we can update to move the eyes. Putting the face position into these variables allows the eyes to follow faces.



![Cover image](cover_image.png)
![Property Panel](property_panel.png)
![LLM Panel](llm_panel.png)
![Main Screen](main_display.png)
