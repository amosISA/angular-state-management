# ✨ Angular - Different Redux Implementations ✨

This repository demonstrates two different approaches to implementing Redux state management in Angular applications. It showcases how you can achieve similar results using either a custom-built solution or a popular library like NgRx.

## Table of Contents
1. [Introduction](#introduction)
2. [Custom Redux Implementation](#custom-redux-implementation)
3. [NgRx Implementation](#ngrx-implementation)
4. [Comparison](#comparison)
5. [How to Use This Repository](#how-to-use-this-repository)
6. [Additional Resources](#additional-resources)

## Introduction

State management in frontend applications has evolved significantly over the years. From simple component-based state to complex global state management solutions, developers have constantly sought ways to manage application state more effectively.

For a comprehensive look at this evolution, check out the article [The Evolution of State Management](https://www.codigotipado.com/p/the-evolution-of-state-management). This post provides valuable insights into how state management techniques have progressed and why understanding this evolution is crucial for modern web development.

## Custom Redux Implementation

In this approach, we've built a custom state management solution using Angular's built-in features like Dependency Injection and Signals. This demonstrates how you can implement Redux-like state management without relying on external libraries.

### Key Features:
- Utilizes Angular's Dependency Injection system
- Leverages Signals for reactive state management
- Custom implementation of actions, reducers, and selectors

To explore this implementation, check out the `apps/angular/custom-redux` directory.

## NgRx Implementation

For the second approach, we've used NgRx, a popular Redux implementation for Angular. NgRx provides a robust set of tools and patterns for managing application state.

### Key Features:
- Uses the official NgRx library
- Implements the standard Redux pattern with actions, reducers, effects, and selectors
- Showcases NgRx's powerful dev tools and middleware capabilities

To explore this implementation, check out the `apps/angular/ngrx` directory.

## Comparison

Both implementations achieve similar goals but differ in their approach:

1. **Custom Redux:**
   - Lightweight and tailored to specific needs
   - Easier to understand for developers new to Redux concepts
   - More flexible but requires more manual setup

2. **NgRx:**
   - Full-featured and battle-tested
   - Extensive ecosystem and community support
   - Steeper learning curve but more scalable for large applications

## How to Use This Repository

1. Clone the repository and install dependencies.
2. Run both applications to see the different implementations in action.
3. Compare the code structure and patterns used in each approach.
4. Use these examples as a reference when deciding on a state management strategy for your own Angular projects.

Remember, the choice between a custom implementation and NgRx depends on your project's specific needs, team expertise, and scalability requirements.

## Additional Resources

If you prefer learning through video content, we recommend checking out this comprehensive course on YouTube: [State Management in Angular Course](https://www.youtube.com/playlist?list=PL0vmzAb282FhgSkMo5avnuRrpzdVvxDYo). This playlist covers various aspects of state management in Angular, providing practical examples and in-depth explanations.

Contributions of any kind are welcome.
Happy coding!

## License

MIT
