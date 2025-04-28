import { expect, test } from "vitest"
import { ref } from "./ref"

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
});

