# Scheduler

The scheduler module is responsible for scheduling tasks and events. It is a core module of the application, as it is responsible for managing the time and resources of the user. The module is divided into several submodules, each of which is responsible for a different aspect of the scheduling process.

## System Design


## Adapters

The adapters submodule contains classes that are responsible for connecting the scheduler to external services. Currently, the module contains two adapters: `caldav_adapter` and `mongodb_adapter`. The `caldav_adapter` is responsible for connecting the scheduler to a CalDAV server, while the `mongodb_adapter` is responsible for connecting the scheduler to a MongoDB database.

## Core

The core submodule contains the core functionality of the scheduler. It contains classes that are responsible for managing the scheduling process, such as the `database` and `strategy` classes. The `database` class is responsible for managing the database of tasks and events, while the `strategy` class is responsible for managing the scheduling strategy.

## Notion Databases

The notion_dbs submodule contains classes that are responsible for managing the Notion databases used by the scheduler. Each class is responsible for managing a different type of database, such as the `courses_database` or the `job_tasks_database`.

## Strategies

The strategies submodule contains classes that are responsible for implementing different scheduling strategies. Each class is responsible for implementing a different scheduling strategy, such as the `cp_strategy` or the `cpm_strategy`.

## Utils

The utils submodule contains utility functions that are used by the scheduler. Currently, the submodule contains the `scheduling` module, which contains utility functions for scheduling tasks and events.

# Usage

The scheduler module can be used to schedule tasks and events. To use the module, you can import the classes and functions that you need from the module. For example, to use the `caldav_adapter` class, you can import it as follows:

