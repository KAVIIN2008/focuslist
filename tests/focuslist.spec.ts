import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    localStorage.clear();
  });

  await page.reload();
});

test('can create a task', async ({ page }) => {
  await page
    .getByLabel('Task title')
    .fill('Learn React');

  await page
    .getByLabel('Task priority')
    .selectOption('high');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  await expect(
    taskList.getByText('Learn React', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('High', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole('region', {
      name: 'Task statistics',
    }),
  ).toContainText('Total');

  await expect(
    page.getByText('Showing 1 of 1 task.', {
      exact: true,
    }),
  ).toBeVisible();
});

test('can complete and uncomplete a task', async ({
  page,
}) => {
  await page
    .getByLabel('Task title')
    .fill('Complete assignment');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  await page.getByRole('button', {
    name: 'Mark "Complete assignment" as completed',
  }).click();

  await expect(
    taskList.getByText('Completed', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole('button', {
      name: 'Mark "Complete assignment" as active',
    }),
  ).toBeVisible();

  await page.getByRole('button', {
    name: 'Mark "Complete assignment" as active',
  }).click();

  await expect(
    page.getByRole('button', {
      name: 'Mark "Complete assignment" as completed',
    }),
  ).toBeVisible();
});

test('can edit task title and priority', async ({
  page,
}) => {
  await page
    .getByLabel('Task title')
    .fill('Original task');

  await page
    .getByLabel('Task priority')
    .selectOption('low');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page.getByRole('button', {
    name: 'Edit "Original task"',
  }).click();

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  const editInput = taskList.getByLabel(
    'Edit task',
  );

  await editInput.fill('Updated task');

  await taskList
    .getByLabel('Priority')
    .selectOption('high');

  await page.getByRole('button', {
    name: 'Save',
  }).click();

  await expect(
    taskList.getByText('Updated task', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('High', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('Original task', {
      exact: true,
    }),
  ).not.toBeVisible();
});

test('pressing Enter saves an edit', async ({
  page,
}) => {
  await page
    .getByLabel('Task title')
    .fill('Before edit');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page.getByRole('button', {
    name: 'Edit "Before edit"',
  }).click();

  const editInput = page
    .getByRole('region', {
      name: 'Task list',
    })
    .getByLabel('Edit task');

  await editInput.fill('After Enter');

  await editInput.press('Enter');

  await expect(
    page.getByRole('region', {
      name: 'Task list',
    }).getByText('After Enter', {
      exact: true,
    }),
  ).toBeVisible();
});

test('pressing Escape cancels an edit', async ({
  page,
}) => {
  await page
    .getByLabel('Task title')
    .fill('Keep this task');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page.getByRole('button', {
    name: 'Edit "Keep this task"',
  }).click();

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  const editInput = taskList.getByLabel(
    'Edit task',
  );

  await editInput.fill(
    'This should not be saved',
  );

  await editInput.press('Escape');

  await expect(
    taskList.getByText('Keep this task', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText(
      'This should not be saved',
      {
        exact: true,
      },
    ),
  ).not.toBeVisible();
});

test('can delete a task', async ({ page }) => {
  await page
    .getByLabel('Task title')
    .fill('Delete me');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  page.once('dialog', (dialog) =>
    dialog.accept(),
  );

  await page.getByRole('button', {
    name: 'Delete "Delete me"',
  }).click();

  await expect(
    page.getByRole('region', {
      name: 'Task list',
    }).getByText('Delete me', {
      exact: true,
    }),
  ).not.toBeVisible();

  await expect(
    page.getByText('No tasks yet', {
      exact: true,
    }),
  ).toBeVisible();
});

test('can search tasks', async ({ page }) => {
  await page
    .getByLabel('Task title')
    .fill('Learn React');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Task title')
    .fill('Build project');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Search tasks')
    .fill('React');

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  await expect(
    taskList.getByText('Learn React', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('Build project', {
      exact: true,
    }),
  ).not.toBeVisible();

  await expect(
    page.getByText('Showing 1 of 2 tasks.', {
      exact: true,
    }),
  ).toBeVisible();
});

test('can filter by status', async ({ page }) => {
  await page
    .getByLabel('Task title')
    .fill('Active task');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Task title')
    .fill('Completed task');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page.getByRole('button', {
    name: 'Mark "Completed task" as completed',
  }).click();

  await page.getByRole('button', {
    name: 'Completed',
    exact: true,
  }).click();

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  await expect(
    taskList.getByText('Completed task', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('Active task', {
      exact: true,
    }).first(),
  ).not.toBeVisible();

  await page.getByRole('button', {
    name: 'Active',
    exact: true,
  }).click();

  await expect(
    taskList.getByText('Active task', {
      exact: true,
    }).first(),
  ).toBeVisible();

  await expect(
    taskList.getByText('Completed task', {
      exact: true,
    }),
  ).not.toBeVisible();
});

test('can filter by priority', async ({ page }) => {
  await page
    .getByLabel('Task title')
    .fill('High task');

  await page
    .getByLabel('Task priority')
    .selectOption('high');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Task title')
    .fill('Low task');

  await page
    .getByLabel('Task priority')
    .selectOption('low');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByRole('region', {
      name: 'Task filters',
    })
    .getByLabel('Priority')
    .selectOption('high');

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  await expect(
    taskList.getByText('High task', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('Low task', {
      exact: true,
    }),
  ).not.toBeVisible();
});

test('can combine search, status, and priority filters', async ({
  page,
}) => {
  await page
    .getByLabel('Task title')
    .fill('React high');

  await page
    .getByLabel('Task priority')
    .selectOption('high');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Task title')
    .fill('React low');

  await page
    .getByLabel('Task priority')
    .selectOption('low');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page.getByRole('button', {
    name: 'Mark "React high" as completed',
  }).click();

  await page
    .getByLabel('Search tasks')
    .fill('React');

  await page.getByRole('button', {
    name: 'Completed',
    exact: true,
  }).click();

  await page
    .getByRole('region', {
      name: 'Task filters',
    })
    .getByLabel('Priority')
    .selectOption('high');

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  await expect(
    taskList.getByText('React high', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('React low', {
      exact: true,
    }),
  ).not.toBeVisible();
});

test('can clear active filters', async ({ page }) => {
  await page
    .getByLabel('Task title')
    .fill('Important task');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Search tasks')
    .fill('does-not-exist');

  await expect(
    page.getByText('No matching tasks', {
      exact: true,
    }),
  ).toBeVisible();

  await page.getByRole('button', {
    name: 'Clear filters',
  }).click();

  await expect(
    page.getByRole('region', {
      name: 'Task list',
    }).getByText('Important task', {
      exact: true,
    }),
  ).toBeVisible();
});

test('statistics update correctly', async ({
  page,
}) => {
  const stats = page.getByRole('region', {
    name: 'Task statistics',
  });

  await page
    .getByLabel('Task title')
    .fill('Task one');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Task title')
    .fill('Task two');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await page
    .getByLabel('Task title')
    .fill('Task three');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  await expect(stats).toContainText('Total');
  await expect(stats).toContainText('3');
  await expect(stats).toContainText('Pending');

  await page.getByRole('button', {
    name: 'Mark "Task one" as completed',
  }).click();

  await expect(stats).toContainText('Completed');
  await expect(stats).toContainText('2');
});

test('tasks persist after page reload', async ({
  page,
}) => {
  await page
    .getByLabel('Task title')
    .fill('Persistent task');

  await page
    .getByLabel('Task priority')
    .selectOption('high');

  await page.getByRole('button', {
    name: 'Add Task',
  }).click();

  const taskList = page.getByRole('region', {
    name: 'Task list',
  });

  await expect(
    taskList.getByText('Persistent task', {
      exact: true,
    }),
  ).toBeVisible();

  await page.reload();

  await expect(
    taskList.getByText('Persistent task', {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    taskList.getByText('High', {
      exact: true,
    }),
  ).toBeVisible();
});

test('keyboard navigation reaches the main controls', async ({
  page,
}) => {
  const taskInput =
    page.getByLabel('Task title');

  await taskInput.fill('Keyboard test');

  await taskInput.focus();

  await expect(taskInput).toBeFocused();

  await page.keyboard.press('Tab');

  await expect(
    page.getByLabel('Task priority'),
  ).toBeFocused();

  await page.keyboard.press('Tab');

  await expect(
    page.getByRole('button', {
      name: 'Add Task',
    }),
  ).toBeFocused();
});

test('mobile layout does not overflow horizontally', async ({
  page,
}) => {
  await page.setViewportSize({
    width: 390,
    height: 844,
  });

  await page.reload();

  const hasHorizontalOverflow =
    await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });

  expect(hasHorizontalOverflow).toBe(false);
});