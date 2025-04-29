import { expect, test } from "vitest"
import { Ref, ref } from "./ref"

test("ref", () => {
    let a = ref(1) 
    let b = ref(a, (v) => v * 2)
    let c = ref(b, (v) => v + 1)
    
    expect(a.val).toBe(1)
    expect(b.val).toBe(2)
    expect(c.val).toBe(3)

    a.val = 2
    expect(a.val).toBe(2)
    expect(b.val).toBe(4)
    expect(c.val).toBe(5)

    b.val = 2
    expect(a.val).toBe(2)
    expect(b.val).toBe(2)
    expect(c.val).toBe(3)

    c.val = 5
    expect(a.val).toBe(2)
    expect(b.val).toBe(2)
    expect(c.val).toBe(5)

    // assigning a copy value to a ref
    b.val = a;
    expect(a.val).toBe(2)

    a.val = 3
    expect(a.val).toBe(3)

    // assigning a new modifier to a ref
    c.val = [b, (v) => v ** 2]
    expect(a.val).toBe(3)
    expect(b.val).toBe(3)
    expect(c.val).toBe(9)

    a.val = 4
    expect(a.val).toBe(4)
    expect(b.val).toBe(4)
    expect(c.val).toBe(16)
});

test("array ref", () => {
    let a = ref([1, 2, 3])
    let b = ref(a, (v) => v.map((i) => i * 2))
    let c = ref(b, (v) => v.map((i) => i + 1))
    expect(a.val).toEqual([1, 2, 3])
    expect(b.val).toEqual([2, 4, 6])
    expect(c.val).toEqual([3, 5, 7])

    // a.val[0] = 2
    a.val = [2, 2, 3]
    expect(a.val).toEqual([2, 2, 3])
    expect(b.val).toEqual([4, 4, 6])
    expect(c.val).toEqual([5, 5, 7])
})

test("nested state", () => {
    let outer = ref({
        inner: ref({
            somethingelse: ref(1)
        }),
        something: ref(2)
    });

    // Test initial values
    expect(outer.val.inner.val.somethingelse.val).toBe(1);
    expect(outer.val.something.val).toBe(2);

    // Modify and test `something` value
    outer.val.something.val = 3;
    expect(outer.val.something.val).toBe(3);

    // Modify and test `somethingelse` value
    outer.val.inner.val.somethingelse.val = 2;
    expect(outer.val.inner.val.somethingelse.val).toBe(2);

    // Modify and test `inner` reference
    outer.val.inner.val = {
        somethingelse: ref(3)
    };
    expect(outer.val.inner.val.somethingelse.val).toBe(3);
});