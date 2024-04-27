<script setup lang="ts">
import Block from './Block.vue';
import Field from './Field.vue';
import FieldGroup from './FieldGroup.vue';
import Title from './Blocks/Title.vue';
import Avatar from './Blocks/Avatar.vue';
import avatar from '../../public/avatar.jpg'
import { ref } from 'vue';

let motivations = ref([
    {
        type: 'M',
        description: 'sdfsdfsdfsdf sdf sdf',
    },
    {
        type: 'M',
        description: 'sdfsdfsdfsdf sdf sdf',
    }
]);

function addMotivation(index: number) {
    motivations.value.splice(index + 1, 0, {
        type: '',
        description: '',
    })
}


function removeMotivation(index: number) {
    motivations.value.splice(index, 1);
}

let obligations = ref([
    {
        type: 'M',
        magnitude: 'sdfsdfsdfsdf sdf sdf',
    },
    {
        type: 'M',
        magnitude: 'sdfsdfsdfsdf sdf sdf',
    }
]);

function addObligation(index: number) {
    obligations.value.splice(index + 1, 0, {
        type: '',
        magnitude: '',
    })
}

function removeObligation(index: number) {
    obligations.value.splice(index, 1);
}

</script>

<template>
    <div class="widget">
        <div class="inner-wrapper">
            <Title content="Character" />
            <Avatar :imageUrl="avatar" />
            <Block class="infos">
                <Field is-important label="Name" data="Hatu" />
                <Field is-important label="Race" data="Zabrak" />
                <Field is-important label="Career" data="Explorer" />
            </Block>
            <Block class="description" title="Description">
                <Field label="Gender" data="M" />
                <Field label="Age" data="28" />
                <Field label="Height" data="1m80" />
                <Field label="Hair" data="Brown" />
                <Field label="Eyes" data="Blue" />
                <Field label="Notable features" is-multiligne />
            </Block>
            <Block class="motivations" title="Motivations">
                <FieldGroup :allow-remove="motivations.length > 1" allow-add v-for="motivation,i in motivations" @add="addMotivation(i)" @remove="removeMotivation(i)">
                    <Field label="Type" :data="motivation.type" />
                    <Field is-multiligne :data="motivation.description" />
                </FieldGroup>
            </Block>
            <Block class="obligations" title="Obligations">
                <FieldGroup :allow-remove="obligations.length > 1" allow-add v-for="obligation,i in obligations" @add="addObligation(i)" @remove="removeObligation(i)">
                    <Field label="Type" is-multiligne :data="obligation.type" />
                    <Field label="Magnitude" is-multiligne :data="obligation.magnitude" />
                </FieldGroup>
            </Block>
        </div>
    </div>
</template>

<style scoped>
.widget {
    container-type: size;
    container-name: widget;
    height: auto;
    width: 100%;
    border-image-slice: 20 20 20 20;
    border-image-width: 20px 20px 20px 20px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: stretch stretch;
    border-image-source: url("/border.svg");
}

.widget::after {
    content: '';
    background: url(/widget-dots.svg) no-repeat;
    position: absolute;
    width: 5px;
    height: 50%;
    right: 0;
    top: 38%;
}

.inner-wrapper {
    display: grid;
    grid-auto-rows: min-content;
    overflow: hidden;
    height: calc(100% - 2rem);
    width: calc(100% - 2rem);
    margin: 1em;
}


.block.description {
    margin-top: 1rem;
}

.block.motivations,
.block.obligations {
    overflow-y: scroll;
}

@container widget (width < 7rem) or (height < 7rem) {
    .inner-wrapper {
        display: grid;
        align-items: center;
        height: calc(100% - 1rem);
        width: calc(100% - 1rem);
        margin: .5em;
        grid-auto-rows: auto;
    }

    .block {
        display: none;
    }

    .block.image {
        display: block;
        height: auto;
        width: auto;
        object-fit: cover;
        max-height: 2.5rem;
    }
}

@container widget (width >=7rem) and (width <14rem) and (height < 7rem) {
    .inner-wrapper {
        display: grid;
        grid-template-columns: 2.8rem 1fr;
        grid-column-gap: .5rem;
        align-items: center;
        height: calc(100% - 1rem);
        width: calc(100% - 1rem);
        margin: .5em;
        grid-auto-rows: auto;
    }

    .block {
        display: none;
    }

    .block.infos {
        display: block;
    }

    .block.infos .field.important {
        display: none;
        border: none;
    }

    .block.infos .field:first-child {
        display: block;
    }

    .block.infos :deep(.field:first-child .label) {
        display: none;
    }

    .block.image {
        display: block;
        height: auto;
        width: auto;
        object-fit: cover;
        max-height: 2.5rem;
    }
}

@container widget (width >=14rem) and (height < 7rem) {
    .inner-wrapper {
        display: grid;
        grid-template-columns: 1fr 2.8em 1fr;
        grid-column-gap: 1rem;
        align-items: center;
        height: calc(100% - 1rem);
        width: calc(100% - 1rem);
        margin: .5em;
        grid-auto-rows: auto;
    }

    .block {
        display: none;
    }

    .block.header {
        display: block;
        margin-bottom: -.5rem;
        margin-left: .5rem;
    }

    .header::before {
        display: none;
    }

    .block.infos {
        display: block;
    }

    .block.infos .field.important {
        display: none;
        border: none;
    }

    .block.infos .field:first-child {
        display: block;
    }

    .block.infos :deep(.field:first-child .label) {
        display: none;
    }

    .block.image {
        position: relative;
        display: block;
        height: auto;
        width: auto;
        object-fit: cover;
        max-height: 2.5rem;
    }

    .block.image::before {
        content: '';
        position: absolute;
        z-index: 1;
        inline-size: 1px;
        block-size: 100vh;
        inset-inline-start: -.5rem;
        border-left: dashed 1px #000;
        top: -50vh;
    }
}

@container widget (width >=10rem) and (height >=7rem) {
    .inner-wrapper {
        display: grid;
        grid-template-areas:
            "head head head"
            "avatar infos infos";
        grid-column-gap: 1rem;
        grid-template-rows: 2rem 1fr;
        grid-template-columns: 3rem auto auto;
        grid-auto-rows: auto;
    }

    .block {
        display: none;
    }

    .block.header {
        display: block;
        grid-area: head;
    }

    .block.infos {
        grid-area: infos;
        display: block;
    }

    .block.infos .field {
        display: grid;
    }

    .block.image {
        grid-area: avatar;
        display: block;
        height: auto;
        width: auto;
        object-fit: cover;
        max-height: 2.8rem;
    }
}

@container widget (width >=10rem) and (width <20rem) and (height >=15rem) {
    .inner-wrapper {
        display: grid;
        grid-template-areas:
            "head head head"
            "avatar infos infos"
            "description description description";
        grid-column-gap: 1rem;
        grid-template-rows: 2rem auto 1fr;
        grid-template-columns: 3rem auto auto;
    }

    .block.description {
        display: block;
        grid-area: description;
        margin-top: 1rem;
    }
}

@container widget (width >=20rem) and (height >=15rem) {
    .inner-wrapper {
        display: grid;
        grid-template-areas:
            "head head head head"
            "avatar infos motivations motivations"
            "description description motivations motivations";
        grid-column-gap: 1rem;
        grid-template-rows: 2rem auto 1fr;
        grid-template-columns: 3rem calc(50% - 3rem - 1.66rem) 3rem calc(50% - 3rem - 1.66rem);
    }

    .block.description {
        display: block;
        grid-area: description;
        margin-top: 1rem;
    }

    .block.motivations {
        grid-area: motivations;
        display: block;
    }
}

@container widget (width >=40rem) and (height >=15rem) {
    .inner-wrapper {
        display: grid;
        grid-template-areas:
            "head head head head head head"
            "avatar infos motivations motivations obligations obligations"
            "description description motivations motivations obligations obligations";
        grid-column-gap: 1rem;
        grid-template-rows: 2rem auto 1fr;
        grid-template-columns: 3rem calc(33% - 3rem - 1.66rem) 3rem calc(33% - 3rem - 1.66rem) 3rem calc(33% - 3rem - 1.66rem);
    }

    .block.obligations {
        grid-area: obligations;
        display: block;
    }
}
</style>